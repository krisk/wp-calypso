module.exports = {
	multiDomainRegistrationV1: {
		datestamp: '20200721',
		variations: {
			singlePurchaseFlow: 10,
			popupCart: 45,
			keepSearchingInGapps: 45
		},
		defaultVariation: 'singlePurchaseFlow'
	},
	translatorInvitation: {
		datestamp: '20150910',
		variations: {
			noNotice: 1,
			startNow: 1,
			helpUs: 1,
			tryItNow: 1,
			startTranslating: 1,
			improve: 1
		},
		defaultVariation: 'noNotice',
		allowAnyLocale: true
	},
	freeTrialsInSignup: {
		datestamp: '20160328',
		variations: {
			disabled: 85,
			enabled: 15
		},
		defaultVariation: 'disabled'
	},
	freeTrialNudgeOnThankYouPage: {
		datestamp: '20160328',
		variations: {
			disabled: 50,
			enabled: 50
		},
		defaultVariation: 'disabled'
	},
	privacyCheckbox: {
		datestamp: '20160310',
		variations: {
			original: 50,
			checkbox: 50
		},
		defaultVariation: 'original'
	},
	verticalThemes: {
		datestamp: '20160324',
		variations: {
			original: 25,
			verticalThemes: 25,
			notTested: 50
		},
		defaultVariation: 'original'
	},
	domainSuggestionVendor: {
		datestamp: '20160408',
		variations: {
			namegen: 75,
			domainsbot: 25,
		},
		defaultVariation: 'namegen'
	},
	contextualGoogleAnalyticsNudge: {
		datestamp: '20160409',
		variations: {
			drake: 25,
			settingsDisabledPlans: 25,
			settingsDisabledPlansCompare: 25,
			settingsDisabledFeature: 25,
		},
		defaultVariation: 'drake',
		allowExistingUsers: true,
	},
	statsTabsLikesNudge: {
		datestamp: '20160409',
		variations: {
			dataInformedInsideChart: 10,
			noNudge: 90
		},
		defaultVariation: 'noNudge'
	},
	swapButtonsMySiteSidebar: {
		datestamp: '20160414',
		variations: {
			original: 50,
			swap: 50
		},
		defaultVariation: 'original'
	},
	guidedTours: {
		datestamp: '20160418',
		variations: {
			original: 96,
			guided: 2,
			calypsoOnly: 2,
		},
		defaultVariation: 'original',
		allowExistingUsers: true,
	},
};
