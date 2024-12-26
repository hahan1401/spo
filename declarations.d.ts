import { BaseComponentContext } from '@microsoft/sp-component-base';
import '@microsoft/sp-webpart-base';

export type PageContext = BaseComponentContext['pageContext'];

declare module '@microsoft/sp-webpart-base' {
	interface WebPartContext {
		pageContext: PageContextWithLegacy;
	}

	// Extract the existing PageContext type from WebPartContext
	interface PageContextWithLegacy extends PageContext {
		legacyPageContext: { serverRequestPath: string; formDigestTimeoutSeconds: number; formDigestValue: string };
	}
}
