SET foreign_key_checks = 0;
SELECT @staffID:=id FROM civicrm_contact WHERE display_name = 'civihr_staff@compucorp.co.uk';
SELECT @managerID:=id FROM civicrm_contact WHERE display_name = 'civihr_manager@compucorp.co.uk';
INSERT INTO `civicrm_hrjobcontract` VALUES (1,@staffID,1,0);
INSERT INTO `civicrm_hrjobcontract_revision` VALUES (1,1,1,'2017-02-23 15:04:46','2017-02-23 15:04:47','2016-01-01','2016-01-01',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,1,0),(2,1,1,'2017-02-23 15:04:47','2017-02-23 15:04:48','2016-01-01','2016-01-01',NULL,NULL,1,NULL,NULL,2,NULL,NULL,1,1,0),(3,1,1,'2017-02-23 15:04:49','2017-02-23 15:04:49','2016-01-01','2016-01-01',NULL,NULL,1,NULL,3,2,NULL,NULL,1,1,0),(4,1,1,'2017-02-23 15:04:49','2017-02-23 15:04:50','2016-01-01','2016-01-01',NULL,NULL,1,NULL,3,2,4,NULL,1,1,0),(5,1,1,'2017-02-23 15:04:50','2017-02-23 15:04:50','2016-01-01','2016-01-01',NULL,NULL,1,5,3,2,4,NULL,1,1,0),(6,1,1,'2017-02-23 15:04:50','2017-02-23 15:04:50','2016-01-01','2016-01-01',NULL,NULL,1,5,3,2,4,6,1,1,0),(7,1,1,'2017-02-23 15:04:50','2017-02-23 15:04:50','2016-01-01',NULL,NULL,NULL,1,5,3,2,4,7,1,0,0);
INSERT INTO `civicrm_hrjobcontract_leave` VALUES (1,1,20,2,1),(2,2,0,2,0),(3,3,0,2,0);
INSERT INTO `civicrm_hrjobcontract_details` VALUES (1,'Developer','Developer',NULL,'Employee - Permanent','2016-01-01',NULL,NULL,0,NULL,0,NULL,NULL,1);
INSERT INTO `civicrm_hrjobcontract_health` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5);
INSERT INTO `civicrm_hrjobcontract_hour` VALUES (1,1,'8',40,'Week',NULL,1,1,3);
INSERT INTO `civicrm_hrjobcontract_pay` VALUES (1,NULL,0,0.00,NULL,NULL,0.00,1,NULL,NULL,NULL,NULL,NULL,4);
INSERT INTO `civicrm_hrjobcontract_pension` VALUES (1,0,0,0,NULL,0.00,NULL,6),(2,0,0,0,NULL,0.00,NULL,7);
INSERT INTO `civicrm_hrleaveandabsences_absence_period` VALUES (1,'2016','2016-01-01','2016-12-31',1),(2,'2017','2017-01-01','2017-12-31',2);
INSERT INTO `civicrm_hrleaveandabsences_public_holiday` VALUES (1,'New Year\'s Day','2016-01-01',1),(2,'Good Friday','2016-03-25',1),(3,'Easter Monday','2016-03-28',1),(4,'Early May bank holiday','2016-05-02',1),(5,'Spring bank holiday','2016-05-30',1),(6,'Summer bank holiday','2016-08-29',1),(7,'Boxing Day','2016-12-26',1),(8,'Christmas Day (substitue day)','2016-12-27',1),(9,'New Year\'s Day (substitute day)','2017-01-02',1),(10,'Good Friday','2017-04-14',1),(11,'Easter Monday','2017-04-17',1),(12,'Early May bank holiday','2017-05-01',1),(13,'Spring bank holiday','2017-05-29',1),(14,'Summer bank holiday','2017-08-28',1),(15,'Christmas day','2017-12-25',1),(16,'Boxing day','2017-12-26',1);
INSERT INTO `civicrm_hrleaveandabsences_leave_period_entitlement` VALUES (1,1,1,@staffID,0,NULL,NULL,NULL),(2,1,2,@staffID,0,NULL,NULL,NULL),(3,1,3,@staffID,0,NULL,NULL,NULL),(4,2,1,@staffID,0,NULL,NULL,NULL),(5,2,2,@staffID,0,NULL,NULL,NULL),(6,2,3,@staffID,0,NULL,NULL,NULL);
INSERT INTO `civicrm_hrleaveandabsences_leave_request` VALUES (1,1,@staffID,2,'2016-01-01',1,'2016-01-01',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(2,1,@staffID,2,'2016-03-25',1,'2016-03-25',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(3,1,@staffID,2,'2016-03-28',1,'2016-03-28',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(4,1,@staffID,2,'2016-05-02',1,'2016-05-02',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(5,1,@staffID,2,'2016-05-30',1,'2016-05-30',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(6,1,@staffID,2,'2016-08-29',1,'2016-08-29',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(7,1,@staffID,2,'2016-12-26',1,'2016-12-26',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(8,1,@staffID,2,'2016-12-27',1,'2016-12-27',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(9,1,@staffID,2,'2017-01-02',1,'2017-01-02',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(10,1,@staffID,2,'2017-04-14',1,'2017-04-14',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(11,1,@staffID,2,'2017-04-17',1,'2017-04-17',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(12,1,@staffID,2,'2017-05-01',1,'2017-05-01',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(13,1,@staffID,2,'2017-05-29',1,'2017-05-29',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(14,1,@staffID,2,'2017-08-28',1,'2017-08-28',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(15,1,@staffID,2,'2017-12-25',1,'2017-12-25',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(16,1,@staffID,2,'2017-12-26',1,'2017-12-26',1,NULL,NULL,NULL,NULL,NULL,'public_holiday',0,0,0),(17,1,@staffID,6,'2016-01-30',1,'2016-02-01',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(18,1,@staffID,1,'2016-02-01',1,'2016-02-03',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(19,1,@staffID,1,'2016-08-17',1,'2016-08-25',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(20,1,@staffID,3,'2016-11-23',1,'2016-11-28',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(21,3,@staffID,5,'2016-06-03',1,'2016-06-13',1,'1',NULL,NULL,NULL,NULL,'sickness',0,0,0),(22,2,@staffID,1,'2016-06-01',1,'2016-06-01',1,NULL,NULL,180,1,'2016-11-01','toil',0,0,0),(23,2,@staffID,1,'2016-06-10',1,'2016-06-10',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(24,2,@staffID,1,'2016-10-20',1,'2016-10-20',1,NULL,NULL,200,1,'2016-11-01','toil',0,0,0),(25,2,@staffID,4,'2016-12-15',1,'2016-12-15',1,NULL,NULL,360,2,'2016-12-31','toil',0,0,0),(26,1,@staffID,5,'2017-01-01',1,'2017-01-10',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(27,3,@staffID,6,'2017-02-01',1,'2017-02-01',1,'2',NULL,NULL,NULL,NULL,'sickness',0,0,0),(28,1,@staffID,1,'2017-02-01',1,'2017-02-05',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(29,1,@staffID,1,'2017-06-23',1,'2017-06-26',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(30,1,@staffID,3,'2017-10-01',1,'2017-10-07',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0),(31,3,@staffID,1,'2017-03-22',1,'2017-03-24',1,'1',NULL,NULL,NULL,NULL,'sickness',0,0,0),(32,2,@staffID,1,'2017-04-25',1,'2017-04-25',1,NULL,NULL,180,1,'2017-05-25','toil',0,0,0),(33,2,@staffID,3,'2017-05-15',1,'2017-05-15',1,NULL,NULL,NULL,NULL,NULL,'leave',0,0,0);
INSERT INTO `civicrm_hrleaveandabsences_leave_request_date`(id, date, leave_request_id) VALUES (1,'2016-01-01',1),(17,'2016-01-30',17),(18,'2016-01-31',17),(19,'2016-02-01',17),(20,'2016-02-01',18),(21,'2016-02-02',18),(22,'2016-02-03',18),(2,'2016-03-25',2),(3,'2016-03-28',3),(4,'2016-05-02',4),(5,'2016-05-30',5),(49,'2016-06-01',22),(38,'2016-06-03',21),(39,'2016-06-04',21),(40,'2016-06-05',21),(41,'2016-06-06',21),(42,'2016-06-07',21),(43,'2016-06-08',21),(44,'2016-06-09',21),(45,'2016-06-10',21),(50,'2016-06-10',23),(46,'2016-06-11',21),(47,'2016-06-12',21),(48,'2016-06-13',21),(23,'2016-08-17',19),(24,'2016-08-18',19),(25,'2016-08-19',19),(26,'2016-08-20',19),(27,'2016-08-21',19),(28,'2016-08-22',19),(29,'2016-08-23',19),(30,'2016-08-24',19),(31,'2016-08-25',19),(6,'2016-08-29',6),(51,'2016-10-20',24),(32,'2016-11-23',20),(33,'2016-11-24',20),(34,'2016-11-25',20),(35,'2016-11-26',20),(36,'2016-11-27',20),(37,'2016-11-28',20),(52,'2016-12-15',25),(7,'2016-12-26',7),(8,'2016-12-27',8),(53,'2017-01-01',26),(9,'2017-01-02',9),(54,'2017-01-02',26),(55,'2017-01-03',26),(56,'2017-01-04',26),(57,'2017-01-05',26),(58,'2017-01-06',26),(59,'2017-01-07',26),(60,'2017-01-08',26),(61,'2017-01-09',26),(62,'2017-01-10',26),(63,'2017-02-01',27),(64,'2017-02-01',28),(65,'2017-02-02',28),(66,'2017-02-03',28),(67,'2017-02-04',28),(68,'2017-02-05',28),(80,'2017-03-22',31),(81,'2017-03-23',31),(82,'2017-03-24',31),(10,'2017-04-14',10),(11,'2017-04-17',11),(83,'2017-04-25',32),(12,'2017-05-01',12),(84,'2017-05-15',33),(13,'2017-05-29',13),(69,'2017-06-23',29),(70,'2017-06-24',29),(71,'2017-06-25',29),(72,'2017-06-26',29),(14,'2017-08-28',14),(73,'2017-10-01',30),(74,'2017-10-02',30),(75,'2017-10-03',30),(76,'2017-10-04',30),(77,'2017-10-05',30),(78,'2017-10-06',30),(79,'2017-10-07',30),(15,'2017-12-25',15),(16,'2017-12-26',16);
INSERT INTO `civicrm_hrleaveandabsences_leave_balance_change` VALUES (1,3,-1.00,NULL,NULL,1,'leave_request_day'),(2,3,-1.00,NULL,NULL,2,'leave_request_day'),(3,3,-1.00,NULL,NULL,3,'leave_request_day'),(4,3,-1.00,NULL,NULL,4,'leave_request_day'),(5,3,-1.00,NULL,NULL,5,'leave_request_day'),(6,3,-1.00,NULL,NULL,6,'leave_request_day'),(7,3,-1.00,NULL,NULL,7,'leave_request_day'),(8,3,-1.00,NULL,NULL,8,'leave_request_day'),(9,3,-1.00,NULL,NULL,9,'leave_request_day'),(10,3,-1.00,NULL,NULL,10,'leave_request_day'),(11,3,-1.00,NULL,NULL,11,'leave_request_day'),(12,3,-1.00,NULL,NULL,12,'leave_request_day'),(13,3,-1.00,NULL,NULL,13,'leave_request_day'),(14,3,-1.00,NULL,NULL,14,'leave_request_day'),(15,3,-1.00,NULL,NULL,15,'leave_request_day'),(16,3,-1.00,NULL,NULL,16,'leave_request_day'),(17,1,20.00,NULL,NULL,1,'entitlement'),(18,3,8.00,NULL,NULL,1,'entitlement'),(19,2,5.00,'2016-04-01',NULL,1,'entitlement'),(20,2,-2.00,'2016-04-01',19,1,'entitlement'),(21,6,5.00,NULL,NULL,3,'entitlement'),(22,1,20.00,NULL,NULL,4,'entitlement'),(23,3,8.00,NULL,NULL,4,'entitlement'),(24,2,5.00,'2017-04-01',NULL,4,'entitlement'),(25,6,5.00,NULL,NULL,6,'entitlement'),(26,5,0.00,NULL,NULL,17,'leave_request_day'),(27,5,0.00,NULL,NULL,18,'leave_request_day'),(28,5,-1.00,NULL,NULL,19,'leave_request_day'),(29,5,-1.00,NULL,NULL,20,'leave_request_day'),(30,5,-1.00,NULL,NULL,21,'leave_request_day'),(31,5,-1.00,NULL,NULL,22,'leave_request_day'),(32,5,-1.00,NULL,NULL,23,'leave_request_day'),(33,5,-1.00,NULL,NULL,24,'leave_request_day'),(34,5,-1.00,NULL,NULL,25,'leave_request_day'),(35,5,0.00,NULL,NULL,26,'leave_request_day'),(36,5,0.00,NULL,NULL,27,'leave_request_day'),(37,5,-1.00,NULL,NULL,28,'leave_request_day'),(38,5,-1.00,NULL,NULL,29,'leave_request_day'),(39,5,-1.00,NULL,NULL,30,'leave_request_day'),(40,5,-1.00,NULL,NULL,31,'leave_request_day'),(41,5,-1.00,NULL,NULL,32,'leave_request_day'),(42,5,-1.00,NULL,NULL,33,'leave_request_day'),(43,5,-1.00,NULL,NULL,34,'leave_request_day'),(44,5,0.00,NULL,NULL,35,'leave_request_day'),(45,5,0.00,NULL,NULL,36,'leave_request_day'),(46,5,-1.00,NULL,NULL,37,'leave_request_day'),(47,5,-1.00,NULL,NULL,38,'leave_request_day'),(48,5,0.00,NULL,NULL,39,'leave_request_day'),(49,5,0.00,NULL,NULL,40,'leave_request_day'),(50,5,-1.00,NULL,NULL,41,'leave_request_day'),(51,5,-1.00,NULL,NULL,42,'leave_request_day'),(52,5,-1.00,NULL,NULL,43,'leave_request_day'),(53,5,-1.00,NULL,NULL,44,'leave_request_day'),(54,5,-1.00,NULL,NULL,45,'leave_request_day'),(55,5,0.00,NULL,NULL,46,'leave_request_day'),(56,5,0.00,NULL,NULL,47,'leave_request_day'),(57,5,-1.00,NULL,NULL,48,'leave_request_day'),(58,4,1.00,'2016-11-01',NULL,49,'leave_request_day'),(59,5,-1.00,NULL,NULL,50,'leave_request_day'),(60,4,1.00,'2016-11-01',NULL,51,'leave_request_day'),(61,4,-1.00,'2016-11-01',60,51,'leave_request_day'),(62,4,2.00,'2016-12-31',NULL,52,'leave_request_day'),(63,5,0.00,NULL,NULL,53,'leave_request_day'),(64,5,0.00,NULL,NULL,54,'leave_request_day'),(65,5,-1.00,NULL,NULL,55,'leave_request_day'),(66,5,-1.00,NULL,NULL,56,'leave_request_day'),(67,5,-1.00,NULL,NULL,57,'leave_request_day'),(68,5,-1.00,NULL,NULL,58,'leave_request_day'),(69,5,0.00,NULL,NULL,59,'leave_request_day'),(70,5,0.00,NULL,NULL,60,'leave_request_day'),(71,5,-1.00,NULL,NULL,61,'leave_request_day'),(72,5,-1.00,NULL,NULL,62,'leave_request_day'),(73,5,-1.00,NULL,NULL,63,'leave_request_day'),(74,5,-1.00,NULL,NULL,64,'leave_request_day'),(75,5,-1.00,NULL,NULL,65,'leave_request_day'),(76,5,-1.00,NULL,NULL,66,'leave_request_day'),(77,5,0.00,NULL,NULL,67,'leave_request_day'),(78,5,0.00,NULL,NULL,68,'leave_request_day'),(79,5,-1.00,NULL,NULL,69,'leave_request_day'),(80,5,0.00,NULL,NULL,70,'leave_request_day'),(81,5,0.00,NULL,NULL,71,'leave_request_day'),(82,5,-1.00,NULL,NULL,72,'leave_request_day'),(83,5,0.00,NULL,NULL,73,'leave_request_day'),(84,5,-1.00,NULL,NULL,74,'leave_request_day'),(85,5,-1.00,NULL,NULL,75,'leave_request_day'),(86,5,-1.00,NULL,NULL,76,'leave_request_day'),(87,5,-1.00,NULL,NULL,77,'leave_request_day'),(88,5,-1.00,NULL,NULL,78,'leave_request_day'),(89,5,0.00,NULL,NULL,79,'leave_request_day'),(90,5,-1.00,NULL,NULL,80,'leave_request_day'),(91,5,-1.00,NULL,NULL,81,'leave_request_day'),(92,5,-1.00,NULL,NULL,82,'leave_request_day'),(93,4,1.00,'2017-05-25',NULL,83,'leave_request_day'),(94,5,-1.00,NULL,NULL,84,'leave_request_day');
INSERT INTO `civicrm_relationship`(contact_id_a, contact_id_b, relationship_type_id) VALUES(@staffID, @managerID, (SELECT rt.id FROM `civicrm_relationship_type` rt WHERE rt.name_a_b = 'has Leave Approved by'));
SET @staffID = NULL;
SET @managerID = NULL;
SET foreign_key_checks = 1;
