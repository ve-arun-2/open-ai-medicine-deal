import { Injectable } from '@nestjs/common';

@Injectable()
export class InputGuardrail {

    private injectionPatterns = [
        /ignore previous/i,
        /system prompt/i,
        /reveal/i,
        /bypass/i
    ];

    check(query: string): string {
        if (!query || !query.trim()) {
            throw new Error("Empty query");
        }

        const normalized = query.trim();

        // length check
        if (normalized.length > 500) {
            throw new Error("Query too long");
        }

        // prompt injection detection
        if (this.injectionPatterns.some(p => p.test(normalized))) {
            throw new Error("Unsafe input detected");
        }

        return normalized;
    }
}