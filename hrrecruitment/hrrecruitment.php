<?php

require_once 'hrrecruitment.civix.php';

/**
 * Implementation of hook_civicrm_config
 */
function hrrecruitment_civicrm_config(&$config) {
  _hrrecruitment_civix_civicrm_config($config);
}

/**
 * Implementation of hook_civicrm_xmlMenu
 *
 * @param $files array(string)
 */
function hrrecruitment_civicrm_xmlMenu(&$files) {
  _hrrecruitment_civix_civicrm_xmlMenu($files);
}

/**
 * Implementation of hook_civicrm_install
 */
function hrrecruitment_civicrm_install() {
  $activityTypesResult = civicrm_api3('activity_type', 'get', array());
  $weight = count($activityTypesResult["values"]);
  foreach (array('Evaluation', 'Comment') as $activityType) {
    if (!in_array($activityType, $activityTypesResult["values"])) {
      civicrm_api3('activity_type', 'create', array(
          'weight'      => $weight++,
          'name'        => $activityType,
          'label'       => ts($activityType),
          'filter'      => 1,
          'is_active'   => 1,
        )
      );
    }
  }

  $result = civicrm_api3('OptionGroup', 'create', array(
    'name' => 'vacancy_status',
    'title' => ts('Vacancy Status'),
    'is_reserved' => 1,
    'is_active' => 1,
    )
  );

  $vacancyStatus = array(
    'Draft' => ts('Draft'),
    'Open' => ts('Open'),
    'Closed' => ts('Closed'),
    'Cancelled' => ts('Cancelled'),
    'Rejected' => ts('Rejected')
  );
  $weight = 1;
  foreach ($vacancyStatus as $name => $label) {
    $statusParam = array(
      'option_group_id' => $result['id'],
      'label' => $label,
      'name' => $name,
      'value' => $weight++,
      'is_active' => 1,
    );
    if ($name == 'Draft') {
      $statusParam['is_default'] = 1;
    }
    elseif ($name == 'Open') {
      $statusParam['is_reserved'] = 1;
    }
    civicrm_api3('OptionValue', 'create', $statusParam);
  }

  $vacancyCaseStatuses = array('Apply', 'Ongoing', 'Phone Interview', 'Manager Interview', 'Board Interview', 'Group Interview', 'Psych Exam', 'Offer', 'Hired');
  foreach ($vacancyCaseStatuses as $key => $label) {
    $caseStatusParam = array(
      'option_group_id' => CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'case_status', 'id', 'name'),
      'label' => ts($label),
      'name' => CRM_Utils_String::munge($label),
      'value' => $key,
      'grouping' => 'Vacancy',
    );
    civicrm_api3('OptionValue', 'create', $caseStatusParam);
  }

  $reportWeight = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Reports', 'weight', 'name');
  $vacancyNavigation = new CRM_Core_DAO_Navigation();
  $params = array (
    'domain_id'  => CRM_Core_Config::domainID(),
    'label'      => ts('Vacancies'),
    'name'       => 'Vacancies',
    'url'        => null,
    'operator'   => null,
    'weight'     => $reportWeight-1,
    'is_active'  => 1
  );
  $vacancyNavigation->copyValues($params);
  $vacancyNavigation->save();

  $vacancyMenuTree = array(
    array(
      'label'      => ts('Dashboard'),
      'name'       => 'dashboard',
      'url'        => 'civicrm/vacancy/dashboard?reset=1',
      'permission' => null,
    ),
    array(
      'label'      => ts('New Vacancy'),
      'name'       => 'new_vacancy',
      'url'        => 'civicrm/vacancy/add?reset=1',
      'permission' => null,
    ),
    array(
      'label'      => ts('New Template'),
      'name'       => 'new_template',
      'url'        => 'civicrm/vacancy/add?reset=1&template=1',
      'permission' => null,
    ),
    array(
      'label'      => ts('Find Vacancies'),
      'name'       => 'find_vacancies',
      'url'        => 'civicrm/vacancy/find?reset=1',
      'permission' => null,
    ),
    array(
      'label'      => ts('Reports'),
      'name'       => 'reports',
      'url'        => null,
      'permission' => null,
    ),
  );

  foreach ($vacancyMenuTree as $key => $menuItems) {
    $menuItems['is_active'] = 1;
    $menuItems['parent_id'] = $vacancyNavigation->id;
    $menuItems['weight'] = $key;
    CRM_Core_BAO_Navigation::add($menuItems);
  }
  CRM_Core_BAO_Navigation::resetNavigation();

  return _hrrecruitment_civix_civicrm_install();
}

/**
 * Implementation of hook_civicrm_uninstall
 */
function hrrecruitment_civicrm_uninstall() {
  $vacanciesId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Vacancies', 'id', 'name');
  CRM_Core_BAO_Navigation::processDelete($vacanciesId);
  CRM_Core_BAO_Navigation::resetNavigation();

  if ($statusId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'vacancy_status', 'id', 'name')) {
    civicrm_api3('OptionGroup', 'delete', array('id' => $statusId));
  }

  foreach (array('Evaluation', 'Comment') as $activityType) {
    if ($id = civicrm_api3('OptionValue', 'getvalue', array('name' => $activityType, 'return' => 'id'))) {
      civicrm_api3('OptionValue', 'delete', array('id' => $id));
    }
  }

  $CaseStatuses = CRM_Core_OptionGroup::values('case_status', FALSE, FALSE, FALSE, " AND grouping = 'Vacancy'", 'id');
  foreach ($CaseStatuses as $id => $dontCare) {
    civicrm_api3('OptionValue', 'delete', array('id' => $id));
  }

  return _hrrecruitment_civix_civicrm_uninstall();
}

/**
 * Implementation of hook_civicrm_enable
 */
function hrrecruitment_civicrm_enable() {
  CRM_Core_BAO_Navigation::processUpdate(array('name' => 'Vacancies'), array('is_active' => 1));
  CRM_Core_BAO_Navigation::resetNavigation();

  if ($vacancyStatusID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'vacancy_status', 'id', 'name')) {
    civicrm_api3('OptionGroup', 'create', array('id' => $vacancyStatusID, 'is_active' => 1));

    $statusIDs = CRM_Core_OptionGroup::valuesByID($vacancyStatusID, FALSE, FALSE, FALSE, 'id', FALSE);
    foreach ($statusIDs as $statusID) {
      civicrm_api3('OptionValue', 'create', array('id' => $statusID, 'is_active' => 1));
    }
  }

  $CaseStatuses = CRM_Core_OptionGroup::values('case_status', FALSE, FALSE, FALSE, " AND grouping = 'Vacancy'", 'id', FALSE);
  foreach ($CaseStatuses as $value => $id) {
    civicrm_api3('OptionValue', 'create', array('id' => $id, 'is_active' => 1));
  }

  foreach (array('Evaluation', 'Comment') as $activityType) {
    if ($id = civicrm_api3('OptionValue', 'getvalue', array('name' => $activityType, 'return' => 'id'))) {
      civicrm_api3('OptionValue', 'create', array('id' => $id, 'is_active' => 1));
    }
  }

  return _hrrecruitment_civix_civicrm_enable();
}

/**
 * Implementation of hook_civicrm_disable
 */
function hrrecruitment_civicrm_disable() {
  CRM_Core_BAO_Navigation::processUpdate(array('name' => 'Vacancies'), array('is_active' => 0));
  CRM_Core_BAO_Navigation::resetNavigation();

  if ($vacancyStatusID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'vacancy_status', 'id', 'name')) {
    $statusIDs = CRM_Core_OptionGroup::valuesByID($vacancyStatusID, FALSE, FALSE, FALSE, 'id');
    foreach ($statusIDs as $statusID) {
      civicrm_api3('OptionValue', 'create', array('id' => $statusID, 'is_active' => 0));
    }
    civicrm_api3('OptionGroup', 'create', array('id' => $vacancyStatusID, 'is_active' => 0));
  }

  foreach (array('Evaluation', 'Comment') as $activityType) {
    if ($id = civicrm_api3('OptionValue', 'getvalue', array('name' => $activityType, 'return' => 'id'))) {
      civicrm_api3('OptionValue', 'create', array('id' => $id, 'is_active' => 0));
    }
  }

  $CaseStatuses = CRM_Core_OptionGroup::values('case_status', FALSE, FALSE, FALSE, " AND grouping = 'Vacancy'", 'id');
  foreach ($CaseStatuses as $value => $id) {
    civicrm_api3('OptionValue', 'create', array('id' => $id, 'is_active' => 0));
  }

  return _hrrecruitment_civix_civicrm_disable();
}

/**
 * Implementation of hook_civicrm_upgrade
 *
 * @param $op string, the type of operation being performed; 'check' or 'enqueue'
 * @param $queue CRM_Queue_Queue, (for 'enqueue') the modifiable list of pending up upgrade tasks
 *
 * @return mixed  based on op. for 'check', returns array(boolean) (TRUE if upgrades are pending)
 *                for 'enqueue', returns void
 */
function hrrecruitment_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _hrrecruitment_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implementation of hook_civicrm_permission
 *
 * @param array $permissions
 * @return void
 */
function hrrecruitment_civicrm_permission(&$permissions) {
  $prefix = ts('CiviHRRecruitment') . ': '; // name of extension or module
  $permissions += array(
    'view Applicants' => $prefix . ts('View Applicants'),
    'evaluate Applicants' => $prefix . ts('Evaluate Applicants'),
    'manage Applicants' => $prefix . ts('Manage Applicants'),
    'administer Applicants' => $prefix . ts('Administer Applicants'),
  );
}

/**
 * Implementation of hook_civicrm_managed
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 */
function hrrecruitment_civicrm_managed(&$entities) {
  return _hrrecruitment_civix_civicrm_managed($entities);
}

/**
 * Implementation of hook_civicrm_caseTypes
 *
 * Generate a list of case-types
 *
 * Note: This hook only runs in CiviCRM 4.4+.
 */
function hrrecruitment_civicrm_caseTypes(&$caseTypes) {
  _hrrecruitment_civix_civicrm_caseTypes($caseTypes);
}

function hrrecruitment_civicrm_entityTypes(&$entityTypes) {
  $entityTypes[] = array(
    'name' => 'HRVacancy',
    'class' => 'CRM_HRRecruitment_DAO_HRVacancy',
    'table' => 'civicrm_hrvacancy',
  );
}

function hrrecruitment_civicrm_navigationMenu( &$params ) {
  $vacanciesMenuItems = array();
  $vacancieStatuses = CRM_Core_OptionGroup::values('vacancy_status');
  $vacanciesId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Vacancies', 'id', 'name');
  $parentVacanciesId =  CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'find_vacancies', 'id', 'name');
  $count = 0;
  foreach ($vacancieStatuses as $value => $vacancyStatus) {
    $vacanciesMenuItems[$count] = array(
      'attributes' => array(
        'label'      => "{$vacancyStatus}",
        'name'       => "{$vacancyStatus}",
        'url'        => "civicrm/vacancy/find?force=1&status={$vacancyStatus}",
        'permission' => NULL,
        'operator'   => 'OR',
        'separator'  => NULL,
        'parentID'   => $parentVacanciesId,
        'navID'      => 1,
        'active'     => 1
      )
    );
    $count++;
  }
  if (!empty($vacanciesMenuItems)) {
    $params[$vacanciesId]['child'][$parentVacanciesId]['child'] = $vacanciesMenuItems;
  }
}