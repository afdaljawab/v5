<?php
/*
$Date: 2010-06-08 17:11:38 +0100 (Tue, 08 Jun 2010) $
$Rev: 1169 $
*/
if (isset($_GET['PPWPP']) && $_GET['PPWPP'] == 'cancel') {
	$GLOBALS['session']->delete('', 'PayPal_Pro');
	httpredir(currentPage(array('PayerID','PPWPP','token')));
}


if (isset($_GET['token']) && isset($_GET['PayerID']) && $GLOBALS['session']->get('stage', 'PayPal_Pro')=='GetExpressCheckoutDetails') {
		
	include_once (CC_ROOT_DIR.CC_DS.'modules'.CC_DS.'plugins'.CC_DS.'PayPal_Pro'.CC_DS.'website_payments_pro.class.php');
	
	if($GLOBALS['user']->is()) {
		$GLOBALS['session']->set('customer_id', $GLOBALS['user']->get('customer_id'), 'PayPal_Pro');
		$GLOBALS['session']->set('phone', $GLOBALS['user']->get('phone'), 'PayPal_Pro');
		$GLOBALS['db']->update('CubeCart_sessions', array('customer_id' => 0), array('session_id' => $GLOBALS['session']->getId()));
		httpredir('index.php?_a=confirm&token='.$_GET['token'].'&PayerID='.$_GET['PayerID']);
	}
	
	$wpp	= new Website_Payments_Pro($GLOBALS['config']->get('PayPal_Pro'));
	
	if ($response = $wpp->GetExpressCheckoutDetails()) {
		
		$GLOBALS['session']->set('PayerID', $response['PAYERID'], 'PayPal_Pro');
		
		$phone_no = $GLOBALS['session']->get('phone', 'PayPal_Pro');
		
		if(isset($response['PHONENUM']) && !empty($response['PHONENUM'])) {
			$phone_no = $response['PHONENUM'];
		} elseif(!empty($phone_no)) {
			// use it :)
		} else {
			$GLOBALS['gui']->setError($lang['account']['error_valid_phone']);
			$phone_no = '';
		}
		
		$customer	= array(
			'title'			=> isset($response['SALUTATION']) ? $response['SALUTATION'] : '',
			'first_name'	=> $response['FIRSTNAME'],
			'last_name'		=> $response['LASTNAME'],
			'email'			=> $response['EMAIL'],
			'phone'			=> $phone_no,
		);

		$address	= array(
			'company_name'	=> '',
			'title'			=> $customer['title'],
			'first_name'	=> $customer['first_name'],
			'last_name'		=> $customer['last_name'],
			'line1'			=> $response['SHIPTOSTREET'],
			'line2'			=> '',
			'postcode'		=> $response['SHIPTOZIP'],
			'town'			=> $response['SHIPTOCITY'],
			
			'state_id'		=> getStateFormat($response['SHIPTOSTATE'], 'abbrev', 'id'),
			'state'			=> getStateFormat($response['SHIPTOSTATE'], 'abbrev', 'name'),
			'state_abbrev'	=> $response['SHIPTOSTATE'],
			
			'country'		=> getCountryFormat($response['SHIPTOCOUNTRYCODE'], 'iso', 'numcode'),
			'country_id'	=> getCountryFormat($response['SHIPTOCOUNTRYCODE'], 'iso', 'numcode'),
			'country_iso'	=> $response['SHIPTOCOUNTRYCODE'],
			'country_iso3'	=> getCountryFormat($response['SHIPTOCOUNTRYCODE'], 'iso', 'iso3'),
			'user_defined'  => true			
			
		);
		
		$this->_basket['customer']			= $customer;
		$this->_basket['billing_address']	= $address;
		$this->_basket['delivery_address']	= $address;
		$this->_basket['register']			= false;
		$this->_basket['terms_agree'] 		= true;		
		
		$GLOBALS['cart']->save();

		$GLOBALS['session']->set('stage', 'DoExpressCheckoutPayment', 'PayPal_Pro');

	}
}