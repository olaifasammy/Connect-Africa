import asyncio
import os
import sys
from google.antigravity import Agent, LocalAgentConfig

async def run_cli():
    # 1. Verification Check
    if "GEMINI_API_KEY" not in os.environ:
        print("❌ Error: Please set your GEMINI_API_KEY environment variable.", file=sys.stderr)
        return

    # 2. Configure Agent
    config = LocalAgentConfig(
        model="gemini-3.5-flash-lite",
        use_api_key_auth=True,
        max_steps=5
    )

    print("🤖 Connect-Africa AI Agent CLI Initialized.")
    print("Type your task or command. Type 'exit' or 'quit' to close.\n")

    # 3. Persistent Loop for CLI experience
    async with Agent(config) as agent:
        while True:
            try:
                # Prompt the user for input
                user_prompt = input("connect-africa-ai ➜ ")
                
                # Check for exit commands
                if user_prompt.strip().lower() in ['exit', 'quit']:
                    print("Goodbye! 👋")
                    break
                
                # Skip empty lines
                if not user_prompt.strip():
                    continue

                # Run the task through the agent
                async with asyncio.timeout(60):
                    response = await agent.chat(user_prompt)
                    print(f"\n{await response.text()}\n")

            except TimeoutError:
                print("\n⚠️ Task timed out. The operation took longer than 60 seconds.\n")
            except KeyboardInterrupt:
                print("\nGoodbye! 👋")
                break
            except Exception as e:
                print(f"\n❌ Error during execution: {e}\n")

if __name__ == "__main__":
    try:
        asyncio.run(run_cli())
    except KeyboardInterrupt:
        print("\nGoodbye! 👋")

