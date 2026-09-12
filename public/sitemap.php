<?php
// Configure this server environment variable to use your CMS sitemap.
$url = getenv('SITEMAP_SOURCE_URL');
if (!$url || !filter_var($url, FILTER_VALIDATE_URL) || !in_array(parse_url($url, PHP_URL_SCHEME), ['http', 'https'], true)) {
    http_response_code(503);
    exit('Sitemap source is not configured.');
}
$xml = @file_get_contents($url);
if ($xml === false) {
    http_response_code(502);
    exit('Sitemap source is unavailable.');
}
header('Content-Type: application/xml; charset=UTF-8');
echo $xml;
