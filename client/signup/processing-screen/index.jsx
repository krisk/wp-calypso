
/**
 * External dependencies
 */
var React = require( 'react' ),
	classNames = require( 'classnames' ),
	flatten = require( 'lodash/flatten' ),
	map = require( 'lodash/map' ),
	map = require( 'lodash/map' ),
	find = require( 'lodash/find' ),
	reject = require( 'lodash/reject' ),
	filter = require( 'lodash/filter' ),
	pick = require( 'lodash/pick' ),
	Card = require( 'components/card' ),
	Button = require( 'components/button' );

/**
 * Internal dependencies
 */
var steps = require( 'signup/config/steps' );

/**
 * Sorts the given steps in the roughly the order they will be processed.
 */
function sortSteps( progressSteps ) {
	var canonicalSteps = pick( steps, map( progressSteps, 'stepName' ) ),
		stepWithToken = find( canonicalSteps, { providesToken: true } ) || [],
		stepsWithoutDependencies = reject( canonicalSteps, function( step ) {
			return step.dependencies || step.providesToken;
		} ),
		stepsWithDependencies = filter( canonicalSteps, function( step ) {
			return step.dependencies && ! step.providesToken;
		} );

	return map( flatten( [ stepWithToken, stepsWithoutDependencies, stepsWithDependencies ] ), function( step ) {
		return find( progressSteps, { stepName: step.stepName } );
	} );
}

module.exports = React.createClass( {
	displayName: 'SignupProcessingScreen',

	showStep: function( step, index ) {
		var classes = classNames( {
			'signup__processing': true,
			'is-pending': step.status === 'pending',
			'is-processing': step.status === 'processing',
			'is-complete': step.status === 'completed'
		} );

		if ( ! step.processingMessage ) {
			return null;
		}

		return (
			<div className={ classes } key={ index }>
				{ step.processingMessage }
			</div>
		);
	},

	render: function() {
		//var stepMarkup = map( sortSteps( this.props.steps ), this.showStep );
		var stepMarkup = map( [
			{ processingMessage: 'Just one second...', status: 'processing' },
			{ processingMessage: 'All done!', status: 'completed' },
		], this.showStep );

		return (
			<div>
				<header className="step-header">
					<h1 className="step-header__title">{ this.translate( 'We emailed you!' ) }</h1>
					<p className="step-header__subtitle">{ this.translate( "We're getting your site ready. It'll only take a few seconds. While you wait, please confirm your email address."  ) }</p>
				</header>

				<Card className="signup__email-confirmation">
					<div className="email-confirmation__step">
						<img className="email-confirmation__step-illustration" src="https://cldup.com/HTmwBYXkOL.svg"/>
						<h2 className="email-confirmation__step-title">Check your email</h2>
						<p className="email-confirmation__step-description">billy123@gmail.com</p>
					</div>
					<span className="email-confirmation__then">then</span>
					<div className="email-confirmation__step">
						<img className="email-confirmation__step-illustration" src="https://cldup.com/QOyStuYoQm.svg"/>
						<h2 className="email-confirmation__step-title">Click the blue button</h2>
						<p className="email-confirmation__step-description"><a href="#">Didn't get the email?</a></p>
					</div>
				</Card>

				{ stepMarkup }

				<Button>Confirm email later</Button>
				
				<div className="signup-processing-screen__loader">{ this.translate( 'Loading…' ) }</div>
			</div>
		);
	}
} );
