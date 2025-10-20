export class KeyRedactor {
    static API_KEY_PATTERNS = [
        /sk-ant-[a-zA-Z0-9_-]{95,}/gi,
        /sk-or-[a-zA-Z0-9_-]{32,}/gi,
        /AIza[a-zA-Z0-9_-]{35}/gi,
        /[a-zA-Z0-9_-]{20,}API[a-zA-Z0-9_-]{20,}/gi,
        /Bearer\s+[a-zA-Z0-9_\-\.]{20,}/gi,
        /([A-Z_]+_API_KEY|[A-Z_]+_TOKEN|[A-Z_]+_SECRET)=["']?([^"'\s]+)["']?/gi,
        /eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/gi
    ];
    static SENSITIVE_FIELDS = [
        'apiKey',
        'api_key',
        'token',
        'secret',
        'password',
        'private_key',
        'privateKey',
        'accessToken',
        'access_token',
        'refreshToken',
        'refresh_token'
    ];
    static redact(text, showPrefix = true) {
        if (!text) return text;
        let redacted = text;
        this.API_KEY_PATTERNS.forEach((pattern)=>{
            redacted = redacted.replace(pattern, (match)=>{
                if (showPrefix && match.length > 8) {
                    const prefix = match.substring(0, 8);
                    return `${prefix}...[REDACTED]`;
                }
                return '[REDACTED_API_KEY]';
            });
        });
        return redacted;
    }
    static redactObject(obj, deep = true) {
        if (!obj || typeof obj !== 'object') return obj;
        const redacted = {
            ...obj
        };
        Object.keys(redacted).forEach((key)=>{
            const lowerKey = key.toLowerCase();
            const isSensitive = this.SENSITIVE_FIELDS.some((field)=>lowerKey.includes(field));
            if (isSensitive && typeof redacted[key] === 'string') {
                const value = redacted[key];
                if (value && value.length > 8) {
                    redacted[key] = `${value.substring(0, 4)}...[REDACTED]`;
                } else {
                    redacted[key] = '[REDACTED]';
                }
            } else if (deep && typeof redacted[key] === 'object' && redacted[key] !== null) {
                redacted[key] = this.redactObject(redacted[key], deep);
            } else if (typeof redacted[key] === 'string') {
                redacted[key] = this.redact(redacted[key]);
            }
        });
        return redacted;
    }
    static sanitize(text) {
        return this.redact(text, true);
    }
    static sanitizeArgs(args) {
        return args.map((arg)=>{
            if (arg.includes('key') || arg.includes('token') || arg.includes('secret')) {
                return this.redact(arg);
            }
            return arg;
        });
    }
    static containsSensitiveData(text) {
        return this.API_KEY_PATTERNS.some((pattern)=>pattern.test(text));
    }
    static validate(text) {
        const warnings = [];
        this.API_KEY_PATTERNS.forEach((pattern, index)=>{
            if (pattern.test(text)) {
                warnings.push(`Potential API key detected (pattern ${index + 1})`);
            }
        });
        return {
            safe: warnings.length === 0,
            warnings
        };
    }
    static redactEnv(env) {
        const redacted = {};
        Object.keys(env).forEach((key)=>{
            const value = env[key];
            if (!value) {
                redacted[key] = '';
                return;
            }
            const lowerKey = key.toLowerCase();
            const isSensitive = lowerKey.includes('key') || lowerKey.includes('token') || lowerKey.includes('secret') || lowerKey.includes('password');
            if (isSensitive) {
                redacted[key] = value.length > 8 ? `${value.substring(0, 4)}...[REDACTED]` : '[REDACTED]';
            } else {
                redacted[key] = value;
            }
        });
        return redacted;
    }
}
export const redactor = KeyRedactor;

//# sourceMappingURL=key-redactor.js.map