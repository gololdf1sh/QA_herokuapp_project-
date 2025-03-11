const fs = require('fs');
const path = require('path');

const testsPath = path.join(__dirname, 'tests'); // Шлях до папки з тестами

// Функція, що додає test.step() до основних дій
function wrapWithTestStep(content: string): string {
    return content.replace(
        /(?<!test\.step\([^)]*?)\b(await\s+[\w.]+\.(goto|click|fill|expect)[^;\n]+;)/g,
        "await test.step('Some action', async () => { $1 });"
    );
}

// Функція обробки всіх тестових файлів
function processTestFiles(dir: string) {
    fs.readdirSync(dir).forEach((file: string) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processTestFiles(filePath); // Рекурсивний виклик для вкладених папок
        } else if (file.endsWith('.spec.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');

            if (!content.includes('test.step(')) { // Перевірка, чи вже є test.step()
                const updatedContent = wrapWithTestStep(content);
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`✅ Оновлено test.step у файлі: ${filePath}`);
            } else {
                console.log(`⏭ ${filePath} - test.step вже присутній, пропускаємо`);
            }
        }
    });
}

// Запускаємо оновлення тестів
processTestFiles(testsPath);
console.log('🎉 Всі тести оновлено з test.step()!');
