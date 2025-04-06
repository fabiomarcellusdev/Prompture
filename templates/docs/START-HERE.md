# 🚀 Starting Your AI Development Session

This guide helps you start a new AI development session effectively.

## 1. 📋 Before Starting

1. Make sure you have:
   - `ai-docs/PRD.md` - Your product requirements
   - `ai-docs/SRS.md` - Your technical specifications
   - `ai-docs/TASKS.md` - Your current tasks
   - `.ai/active-context.md` - Your current context

2. If any files are missing, generate them:
   ```bash
   prompture ai-docs --type PRD
   prompture ai-docs --type SRS
   prompture ai-docs --type TASKS
   ```

## 2. 🎯 Starting Your Session

Copy and paste this template at the start of every new AI chat:

```
You're assisting with my full stack app. Here's the project context:

[Paste contents of .ai/active-context.md]

Development Rules:
[Choose ONE of the following to paste:
- ai-docs/CLEAN-AI-CODE.md for detailed development rules
- ai-docs/ai-code.summary.md for concise coding guidelines]

Please:
1. Review the context and current task
2. Follow the selected development rules
3. Track token usage and notify me when close to the limit specified in active-context.md
4. Ask for clarification if anything is unclear
```

## 3. 🔄 During Development

- Use `prompture context --task "Your current task"` to update context
- Reference `ai-docs/AI-PROMPTS.md` for specific prompt templates
- Use `ai-docs/ai-code.summary.md` to summarize code changes

## 4. 📝 Ending Your Session

When ending a session:
1. Ask the AI to summarize the session
2. Save the summary to `.ai/archived-summaries/YYYY-MM-DD_summary.md`
3. Update `ai-docs/TASKS.md` with completed items
4. Run `prompture context --task "Next task"` to prepare for next session

## 5. 🧠 Best Practices

- Start each session with fresh context
- Keep tasks focused and specific
- Archive summaries after each session
- Update context when switching tasks
- Track token usage to avoid context loss

## 6. 🆘 Need Help?

- Check `ai-docs/AI-PROMPTS.md` for specific prompt templates
- Review `ai-docs/CLEAN-AI-CODE.md` or `ai-docs/ai-code.summary.md` for development rules
- Look at `.ai/archived-summaries/` for example sessions 