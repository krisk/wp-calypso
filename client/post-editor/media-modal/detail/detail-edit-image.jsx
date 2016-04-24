/**
 * External dependencies
 */
var React = require( 'react' ),
	classNames = require( 'classnames' ),
	noop = require( 'lodash/noop' );

/**
 * Internal dependencies
 */
var EditorMediaModalDetailFields = require( './detail-fields' ),
	EditorMediaModalDetailFileInfo = require( './detail-file-info' ),
	EditorMediaModalDetailPreviewImage = require( './detail-preview-image' ),
	SectionNav = require( 'components/section-nav' ),
	SectionNavTabs = require( 'components/section-nav/tabs' ),
	SectionNavTabItem = require( 'components/section-nav/item' ),
	Gridicon = require( 'components/gridicon' ),
	userCan = require( 'lib/site/utils' ).userCan,
	MediaUtils = require( 'lib/media/utils' );

module.exports = React.createClass( {
	displayName: 'EditorMediaModalDetailItem',

	propTypes: {
		site: React.PropTypes.object,
		item: React.PropTypes.object,
		hasPreviousItem: React.PropTypes.bool,
		hasNextItem: React.PropTypes.bool,
		onShowPreviousItem: React.PropTypes.func,
		onShowNextItem: React.PropTypes.func
	},

	getDefaultProps: function () {
		return {
			hasPreviousItem: false,
			hasNextItem: false,
			onShowPreviousItem: noop,
			onShowNextItem: noop
		};
	},

	getInitialState: function () {
		return this.getDefaultState( this.props );
	},

	getDefaultState: function ( props ) {
		return {
			filter: props.filter || 'fields'
		};
	},

	getFilterLabel: function ( filter ) {
		var label;

		switch ( filter ) {
			case 'crop':
				label = this.translate( 'Crop', { comment: 'Filter label for image editor tools', textOnly: true } );
				break;
			case 'fields':
			default:
				label = this.translate( 'Fields', { comment: 'Filter label for image editor tools', textOnly: true } );
				break;
		}

		return label;
	},

	onFilterChange: function ( filter ) {
		this.setState( {
			filter: filter
		} );
	},

	renderFields: function () {
		if ( ! userCan( 'upload_files', this.props.site ) ) {
			return (
				<div>
					<EditorMediaModalDetailFileInfo
						item={ this.props.item } />
				</div>
			);
		}

		return (
			<div>
				<EditorMediaModalDetailFields
					site={ this.props.site }
					item={ this.props.item } />
				<EditorMediaModalDetailFileInfo
					item={ this.props.item } />
			</div>
		);
	},

	renderPreviousItemButton: function () {
		if ( ! this.props.hasPreviousItem ) {
			return;
		}

		return (
			<button
				onClick={ this.props.onShowPreviousItem }
				className="editor-media-modal-detail__previous">
				<Gridicon icon="chevron-left" size={ 36 } />
				<span className="screen-reader-text">
					{ this.translate( 'Previous' ) }
				</span>
			</button>
		);
	},

	renderNextItemButton: function () {
		if ( ! this.props.hasNextItem ) {
			return;
		}

		return (
			<button
				onClick={ this.props.onShowNextItem }
				className="editor-media-modal-detail__next">
				<Gridicon icon="chevron-right" size={ 36 } />
				<span className="screen-reader-text">
					{ this.translate( 'Next' ) }
				</span>
			</button>
		);
	},

	renderTabItems: function () {
		const tabs = [ 'crop', 'fields' ];

		return tabs.map( function( filter ) {
			return (
				<SectionNavTabItem
					key={ 'filter-tab-' + filter }
					selected={ this.state.filter === filter }
					onClick={ this.onFilterChange.bind( null, filter ) }>
					{ this.getFilterLabel( filter ) }
				</SectionNavTabItem>
			);
		}, this );
	},

	renderContent: function () {
		return this.renderFields();
	},

	render: function() {
		var classes = classNames( 'editor-media-modal-detail__item', {
			'is-loading': ! this.props.item
		} );

		return (
			<figure className={ classes }>
				<div className="editor-media-modal-detail__content editor-media-modal__content">
					<div className="editor-media-modal-detail__preview-wrapper">
						<EditorMediaModalDetailPreviewImage
							site={ this.props.site }
							item={ this.props.item } />
						{ this.renderPreviousItemButton() }
						{ this.renderNextItemButton() }
					</div>
					<div className="editor-media-modal-detail__sidebar">
						<div className="editor-media-modal-detail__sidebar-content">
							{ this.renderContent() }
						</div>
					</div>
				</div>
			</figure>
		);
	}
} );
