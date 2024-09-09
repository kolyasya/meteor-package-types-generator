var fs = require('fs');
var child_process = require('child_process');

const execPromise = command => {
  return new Promise((resolve, reject) => {
    child_process.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({
          error,
          stderr,
          stdout
        });
      } else {
        resolve(stdout);
      }
    });
  });
};
const meteorPackageTypesGenerator = {
  run: async ({
    tsInput,
    declarationInput,
    declarationOutput,
    prefix,
    tscCliParams = '--emitDeclarationOnly --declaration --declarationMap'
  }) => {
    try {
      await execPromise(`npx tsc ${tsInput.join(' ')} --outFile ${declarationInput} ${tscCliParams}`);
    } catch (error) {
      console.log(error == null ? void 0 : error.stderr);
      console.log(error == null ? void 0 : error.stdout);
      console.error(error == null ? void 0 : error.error);
    }
    // Read the contents of the generated .d.ts file
    const fileContent = fs.readFileSync(declarationInput, 'utf-8');
    // Add prefix to each module declaration
    const updatedContent = fileContent.replace(/declare module ["'](.+?)["']/g, (match, p1) => {
      return `declare module "${prefix}${p1}"`;
    }).replace(/\/index/g, '');
    // Write the updated content to a new file or overwrite the existing file
    fs.writeFileSync(declarationOutput, updatedContent, 'utf-8');
    console.log(`Prefixes added to modules and written to ${declarationOutput}`);
  }
};

exports.meteorPackageTypesGenerator = meteorPackageTypesGenerator;
//# sourceMappingURL=index.cjs.map
