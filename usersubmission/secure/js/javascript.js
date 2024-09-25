import { ESLint } from "eslint";

export async function jsCode(js) {
  try {
    const eslint = new ESLint();
    const results = await eslint.lintText(js);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    return resultText;
  } catch (error) {}
}
