-- \c labbyRewriteDB;

DROP FUNCTION IF EXISTS populateTasks();

-- populateTasks()
CREATE OR REPLACE FUNCTION populateTasks() RETURNS VOID AS $$
BEGIN
    DELETE FROM labby_tasks;
    INSERT INTO labby_tasks (
        task_name,
        task_description,
        task_category,
        task_category_position,
        fk_task_creator_id,
        task_colour_id,
        created_at
    ) 
    VALUES
        ('Acme Ecommerce App', 'acme-admin.mathewbushuru.com', 'in-progress', 0, 1, 1, now()),
        ('Checklists App', 'checklists.mathewbushuru.com', 'in-progress', 1, 1, 2, now()),
        ('Flix App', 'movies.mathewbushuru.com', 'to-do',0, 1, 3, now()),
        ('Outfits App', 'outfits.mathewbushuru.com', 'adopt-me', 0, 1, 4, now()),
        ('Battleship Game', 'battleship.mathewbushuru.com', 'completed', 0, 1, 5, now());
END;
$$ LANGUAGE  plpgsql;

SELECT populateTasks();
