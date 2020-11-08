import { DropTable } from "../DropTable";
import { SimpleMonster } from "../SimpleMonster";

const dropTable = new DropTable(({}))
  .always(526, 1)
  .always(314, [1, 11])
  .always(2138, 1);

export const chicken = new SimpleMonster({
  id: 1,
  name: "Chicken",
  dropTable,
});
