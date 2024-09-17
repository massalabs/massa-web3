import { ErrorCodes } from './utils/codes';
/**
 * ErrorBase extends the native Error class to provide additional metadata handling for richer error information.
 * This class can serve as a base for more specific error types in a wallet or similar system.
 */
export class ErrorBase extends Error {
    metaMessages;
    docsPath;
    code;
    cause;
    name = 'MassaWeb3Error';
    constructor(shortMessage, args) {
        super();
        const metaMessageStr = args?.metaMessages?.map((msg) => `Meta: ${msg}`).join('\n') || '';
        const docsMessageStr = args?.docsPath
            ? `Docs: see ${args?.docsPath} for more information.`
            : '';
        const detailsMessage = args?.details ? `Details: ${args.details}` : '';
        this.message = [
            shortMessage,
            metaMessageStr,
            docsMessageStr,
            detailsMessage,
        ]
            .filter(Boolean)
            .join('\n\n');
        this.metaMessages = args?.metaMessages || [];
        this.docsPath = args?.docsPath;
        this.code = args?.code ?? ErrorCodes.UnknownError;
        this.cause = args?.cause;
    }
}
//# sourceMappingURL=base.js.map