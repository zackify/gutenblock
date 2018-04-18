<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function crossfield_blocks_assets() {
	wp_enqueue_script(
		'crossfield_blocksjs',

		//IN PRODUCTION put plugins_url( '/build/main.js', dirname( __FILE__ ) )
		'http://localhost:8080/main.js', 
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ) 
	);
} 

add_action( 'enqueue_block_editor_assets', 'crossfield_blocks_assets' );
