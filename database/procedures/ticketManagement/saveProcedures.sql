USE `labby`;

DROP procedure IF EXISTS `save_task`;
DROP procedure IF EXISTS `save_subtask`;
DROP procedure IF EXISTS `update_task_status`;
DROP procedure IF EXISTS `update_task_title`;
DROP procedure IF EXISTS `update_task_description`;
DROP procedure IF EXISTS `update_subtask_status`;

DELIMITER $$

CREATE PROCEDURE `save_task` (
   IN `_task_uuid` VARCHAR(50),
   IN `_fk_survey_id` VARCHAR(50),
   IN `_fk_form_id` VARCHAR(50),
   IN `_fk_project_id` VARCHAR(50),
   IN `_task_title` VARCHAR(100),
   IN `_task_description` VARCHAR(250),
   IN `_task_state` VARCHAR(50)
 
) BEGIN INSERT INTO `tasks` (
   `task_uuid`,
   `fk_survey_id`,
   `fk_form_id`,
   `fk_project_id`,
   `task_title`,
   `task_description`,
   `task_state`
)
VALUES
   (
   `_task_uuid`,
   `_fk_survey_id`,
   `_fk_form_id`,
   `_fk_project_id`,
   `_task_title`,
   `_task_description`,
   `_task_state`
   );
  
END $$

CREATE PROCEDURE `update_task_status` (
   IN `_task_uuid` VARCHAR(50),
   IN `_task_state` VARCHAR(50)
 
) BEGIN 
UPDATE `tasks` SET `task_state`=`_task_state` WHERE `task_uuid`=`_task_uuid`;
UPDATE `subtasks` SET `subtask_state`=`_task_state` WHERE `subtask_uuid`=`_task_uuid`;
  
END $$

CREATE PROCEDURE `update_task_title` (
   IN `_task_uuid` VARCHAR(50),
   IN `_task_title` VARCHAR(250)
 
) BEGIN 
UPDATE `tasks` SET `task_title`=`_task_title` WHERE `task_uuid`=`_task_uuid`;
UPDATE `subtasks` SET `subtask_title`=`_task_title` WHERE `subtask_uuid`=`_task_uuid`;
  
END $$

CREATE PROCEDURE `update_task_description` (
   IN `_task_uuid` VARCHAR(50),
   IN `_task_description` VARCHAR(250)
 
) BEGIN 
UPDATE `tasks` SET `task_description`=`_task_description` WHERE `task_uuid`=`_task_uuid`;
UPDATE `subtasks` SET `subtask_description`=`_task_description` WHERE `subtask_uuid`=`_task_uuid`;
  
END $$

CREATE PROCEDURE `save_subtask` (
   IN `_subtask_uuid` VARCHAR(50),
   IN `_subtask_title` VARCHAR(100),
   IN `_subtask_description` VARCHAR(250),
   IN `_subtask_state` VARCHAR(50),
   IN `_fk_task_id` INT(10)

 
) BEGIN INSERT INTO `subtasks` (
   `subtask_uuid`,
   `subtask_title`,
   `subtask_description`,
   `subtask_state`,
   `fk_task_id`
)
VALUES
   (
   `_subtask_uuid`,
   `_subtask_title`,
   `_subtask_description`,
   `_subtask_state`,
   `_fk_task_id`
   );
  
END $$

CREATE PROCEDURE `update_subtask_status` (
   IN `_task_uuid` VARCHAR(50),
   IN `_subtask_state` VARCHAR(50)
 
) BEGIN 
UPDATE `subtasks` SET `subtask_state`=`_subtask_state` WHERE `subtask_uuid`=`_task_uuid`;
  
END $$

  
DELIMITER ;
