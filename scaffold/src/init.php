<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Initializer
 *
 * Enqueue JS of all the blocks.
 *
 * @since 	1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function crossfield_blocks_assets() {
	wp_enqueue_script(
		'crossfield_blocks-cgb-block-js', // Handle.

		//IN PRODUCTION put plugins_url( '/build/main.js', dirname( __FILE__ ) )
		'http://localhost:8080/main.js', // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ) // Dependencies, defined above.
	);
} 

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'crossfield_blocks_assets' );
