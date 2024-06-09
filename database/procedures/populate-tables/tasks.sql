USE checklistsDB;

DROP PROCEDURE IF EXISTS `populateTasks`;

DELIMITER $$

-- populateTasks
CREATE PROCEDURE `populateTasks`()
BEGIN 
    DELETE FROM tasks;
    INSERT INTO tasks (
        task_name,
        task_description,
        task_category,
        fk_task_creator_id,
        task_colour_id
    )
    VALUES 
        ("Acme Ecommerce App", "acme-admin.mathewbushuru.com", "in-progress", 1, 1),
        ("Checklists App", "checklists.mathewbushuru.com", "in-progress", 1, 2),
        ("Flix App", "movies.mathewbushuru.com", "to-do", 1, 3),
        ("Outfits App", "outfits.mathewbushuru.com", "adopt-me", 1, 4),
        ("Battleship Game", "battleship.mathewbushuru.com", "completed", 1, 5);
END $$

DELIMITER ;

CALL populateTasks();