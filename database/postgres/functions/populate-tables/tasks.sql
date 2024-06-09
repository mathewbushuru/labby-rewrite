\c checklistsDB;

DROP FUNCTION IF EXISTS populateTasks();

-- populateTasks()
CREATE OR REPLACE FUNCTION populateTasks() RETURNS VOID AS $$
BEGIN
    DELETE FROM tasks;
    INSERT INTO tasks (
        task_name,
        task_description,
        task_category,
        fk_task_creator_id,
        task_colour_id,
        created_at
    ) 
    VALUES
        ('Acme Ecommerce App', 'acme-admin.mathewbushuru.com', 'in-progress', 1, 1, now()),
        ('Checklists App', 'checklists.mathewbushuru.com', 'in-progress', 1, 2, now()),
        ('Flix App', 'movies.mathewbushuru.com', 'to-do', 1, 3, now()),
        ('Outfits App', 'outfits.mathewbushuru.com', 'adopt-me', 1, 4, now()),
        ('Battleship Game', 'battleship.mathewbushuru.com', 'completed', 1, 5, now());
END;
$$ LANGUAGE  plpgsql;

SELECT populateTasks();
