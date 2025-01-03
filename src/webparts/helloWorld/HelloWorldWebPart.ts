import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import { getSP } from './pnpjsConfig';

export interface IHelloWorldWebPartProps {
	description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IHelloWorldProps> = React.createElement(HelloWorld, {
			context: this.context,
		});

		ReactDom.render(element, this.domElement);
	}

	protected async onInit(): Promise<void> {
		getSP(this.context);
		await this._getEnvironmentMessage();
	}

	private _getEnvironmentMessage(): Promise<string> {
		if (!!this.context.sdks.microsoftTeams) {
			// running in Teams, office.com or Outlook
			return this.context.sdks.microsoftTeams.teamsJs.app.getContext().then((context) => {
				let environmentMessage: string = '';
				switch (context.app.host.name) {
					case 'Office': // running in Office
						environmentMessage = this.context.isServedFromLocalhost
							? strings.AppLocalEnvironmentOffice
							: strings.AppOfficeEnvironment;
						break;
					case 'Outlook': // running in Outlook
						environmentMessage = this.context.isServedFromLocalhost
							? strings.AppLocalEnvironmentOutlook
							: strings.AppOutlookEnvironment;
						break;
					case 'Teams': // running in Teams
					case 'TeamsModern':
						environmentMessage = this.context.isServedFromLocalhost
							? strings.AppLocalEnvironmentTeams
							: strings.AppTeamsTabEnvironment;
						break;
					default:
						environmentMessage = strings.UnknownEnvironment;
				}

				return environmentMessage;
			});
		}

		return Promise.resolve(
			this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment,
		);
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
			this.domElement.style.setProperty('--link', semanticColors.link || null);
			this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
	}
}
