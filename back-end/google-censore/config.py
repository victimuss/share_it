from google import genai

client = genai.Client(api_key="[ENCRYPTION_KEY]")

try:
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        contents="Привет! Ты меня слышишь? Какая ты модель?"
    )
    print("--- ОТВЕТ ГЕМИНИ ---")
    print(response.text)
except Exception as e:
    print(f"Опять осечка: {e}")