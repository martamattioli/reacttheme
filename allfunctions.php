<?php
function react_theme_enqueue_scripts() {
  wp_enqueue_script( 'app', get_stylesheet_directory_uri() . '/dist/app.js', array('jquery'), 1, false );
}

?>
