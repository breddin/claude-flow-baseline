import { KeyRedactor } from '../utils/key-redactor.js';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
export async function validateNoSensitiveData() {
    const issues = [];
    try {
        const stagedFiles = execSync('git diff --cached --name-only', {
            encoding: 'utf-8'
        }).split('\n').filter((f)=>f.trim() && !f.includes('.env') && !f.includes('node_modules') && !f.endsWith('.map'));
        const placeholderPatterns = [
            /API_KEY=\(paste/i,
            /API_KEY=\(your/i,
            /API_KEY=\.\.\./i,
            /API_KEY="\.\.\."/i,
            /API_KEY="\(paste/i,
            /API_KEY="\(your/i,
            /API_KEY=sk-ant-\.\.\./i,
            /API_KEY=sk-or-v1-\.\.\./i,
            /API_KEY="sk-ant-\.\.\."/i,
            /API_KEY="sk-or-v1-\.\.\."/i,
            /API_KEY=sk-ant-xxxxx/i,
            /API_KEY=sk-or-v1-xxxxx/i,
            /TOKEN=\(paste/i,
            /TOKEN=\(your/i,
            /SECRET=\(paste/i,
            /SECRET=\(your/i
        ];
        for (const file of stagedFiles){
            try {
                if (file.startsWith('docs/') || file.includes('/docs/')) {
                    const content = readFileSync(file, 'utf-8');
                    const hasOnlyPlaceholders = placeholderPatterns.some((pattern)=>pattern.test(content));
                    if (hasOnlyPlaceholders) {
                        continue;
                    }
                }
                const content = readFileSync(file, 'utf-8');
                const hasPlaceholders = placeholderPatterns.some((pattern)=>pattern.test(content));
                if (hasPlaceholders && (file.includes('example') || file.includes('template') || file.includes('/docs/'))) {
                    continue;
                }
                const validation = KeyRedactor.validate(content);
                if (!validation.safe) {
                    const warningsText = validation.warnings.join(' ');
                    if (hasPlaceholders && !warningsText.includes('sk-ant-a') && !warningsText.includes('sk-or-v')) {
                        continue;
                    }
                    issues.push(`⚠️  ${file}: ${validation.warnings.join(', ')}`);
                }
            } catch (error) {
                continue;
            }
        }
        return {
            safe: issues.length === 0,
            issues
        };
    } catch (error) {
        console.error('Error validating sensitive data:', error);
        return {
            safe: false,
            issues: [
                'Failed to validate files'
            ]
        };
    }
}
export async function runRedactionCheck() {
    console.log('🔒 Running API key redaction check...\n');
    const result = await validateNoSensitiveData();
    if (!result.safe) {
        console.error('❌ COMMIT BLOCKED - Sensitive data detected:\n');
        result.issues.forEach((issue)=>console.error(issue));
        console.error('\n⚠️  Please remove sensitive data before committing.');
        console.error('💡 Tip: Use environment variables instead of hardcoding keys.\n');
        return 1;
    }
    console.log('✅ No sensitive data detected - safe to commit\n');
    return 0;
}
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
    runRedactionCheck().then((code)=>process.exit(code)).catch((error)=>{
        console.error('Error:', error);
        process.exit(1);
    });
}

//# sourceMappingURL=redaction-hook.js.map