import {NavBar} from "../../widgets/Navbar/Navbar.tsx";
import {KanbanBoard} from "../../features/dragAndDrop/ui/KanbanBoard/KanbanBoard.tsx";

export const BoardPage = () => {

  return (
    <div>
      <NavBar />
      <KanbanBoard />
    </div>
  )
};