export async function checkCss(css) {
    try{
        const result = await stylelint.lint({
            code: css,
            configFile: '.stylelintrc',
        });
        return result.results[0].warnings;
    }
    catch(error){
        throw new Error('Stylelint failed');

    }
    
}