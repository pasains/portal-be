CREATE OR REPLACE FUNCTION userHistory()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    PERFORM historyChanges(old.userId, 'delete', row_to_json(OLD), null);
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    PERFORM historyChanges(old.userId, 'update', row_to_json(OLD), row_to_json(NEW));
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    PERFORM historyChanges(new.userId, 'insert', null, row_to_json(NEW));
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER userHistory_trigger
AFTER INSERT OR UPDATE OR DELETE ON "User"
FOR EACH ROW EXECUTE FUNCTION userHistory();
