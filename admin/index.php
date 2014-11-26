<?php
/**
 * CubeCart v5
 * ========================================
 * CubeCart is a registered trade mark of CubeCart Limited
 * Copyright CubeCart Limited 2014. All rights reserved.
 * UK Private Limited Company No. 5323904
 * ========================================
 * Web:   http://www.cubecart.com
 * Email:  sales@devellion.com
 * License:  GPL-2.0 http://opensource.org/licenses/GPL-2.0
 */
if (file_exists('..'.DIRECTORY_SEPARATOR.'admin.php')) {
	header('location: ../admin.php', true, 301);
	exit;
} else {
	header('HTTP/1.1 404 Not Found');
	header('HTTP/1.0 404 Not Found');
	header('Status: 404 Not Found');
}
?>
<html>
<head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL <?php echo $_SERVER['REQUEST_URI']; ?> was not found on this server.</p>
<hr>
<address><?php echo $_SERVER['SERVER_SOFTWARE']; ?></address>
</body>
</html>