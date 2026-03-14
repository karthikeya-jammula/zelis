import os
import re

import requests

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL_NAME = "openai/gpt-4o"
DEFAULT_MAX_TOKENS = int(os.getenv("OPENROUTER_MAX_TOKENS", "1024"))
TOKEN_FALLBACKS = [4000, 2000, 1000, 512, 256, 128]


def get_api_key() -> str:
    """Read API key from env or ask once in terminal."""
    api_key = os.getenv("OPENROUTER_API_KEY", "").strip()
    if api_key:
        return api_key

    print("OPENROUTER_API_KEY is not set.")
    api_key = input("Paste your OpenRouter API key: ").strip()
    return api_key


def chat_with_gpt4o(prompt: str, api_key: str) -> str:
    """Send one prompt to OpenRouter GPT-4o and return assistant text."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.getenv("OPENROUTER_SITE_URL", "http://localhost"),
        "X-Title": os.getenv("OPENROUTER_APP_NAME", "Python OpenRouter Chat"),
    }

    # Try requested token budget first, then progressively smaller budgets on 402.
    token_attempts = [DEFAULT_MAX_TOKENS] + [
        t for t in TOKEN_FALLBACKS if t < DEFAULT_MAX_TOKENS
    ]
    last_error = "Unknown error"

    for max_tokens in token_attempts:
        payload = {
            "model": MODEL_NAME,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
        }

        try:
            response = requests.post(
                OPENROUTER_BASE_URL,
                headers=headers,
                json=payload,
                timeout=60,
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except requests.exceptions.HTTPError:
            status = response.status_code if response is not None else "unknown"
            body = response.text if response is not None else "No response body"
            last_error = f"HTTP error {status}: {body}"

            if status == 402:
                # If OpenRouter tells us the affordable limit, retry with that budget.
                match = re.search(r"can only afford\s+(\d+)", body)
                if match:
                    affordable = int(match.group(1))
                    if 1 <= affordable < max_tokens:
                        token_attempts.append(affordable)
                continue

            return last_error
        except requests.exceptions.RequestException as exc:
            return f"Request failed: {exc}"
        except (KeyError, IndexError, TypeError, ValueError) as exc:
            return f"Unexpected response format: {exc}"

    return last_error


def main() -> None:
    print(f"OpenRouter Chat ({MODEL_NAME})")
    print("Type 'quit' to exit.\n")

    api_key = get_api_key()
    if not api_key.startswith("sk-or-v1-"):
        print("Invalid OpenRouter API key format.")
        return

    while True:
        prompt = input("You: ").strip()
        if prompt.lower() == "quit":
            print("Goodbye!")
            break
        if not prompt:
            continue

        print("GPT-4o:", chat_with_gpt4o(prompt, api_key))
        print()


if __name__ == "__main__":
    main()
