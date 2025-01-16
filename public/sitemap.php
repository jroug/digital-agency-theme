<?php

header('Content-Type: text/xml; charset=UTF-8');
echo file_get_contents('https://webinsite.gr/content/sitemap-xml/');

?>