export const onUpdateTrigger = table => `
    DROP TRIGGER IF EXISTS ${table}_updated_at
    ON ${table};
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
`;