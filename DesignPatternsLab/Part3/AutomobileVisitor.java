public class AutomobileVisitor {
    public void Visit(Automobile variable) {
        // this method is usually abstracted into an interface that this class
        // implements
        // automobile is an abstract class in this case, so no need for operations
    }

    public void Visit(Truck variable) {
        // Truck inherits Automobile
    }

    public void Visit(Car variable) {
        // Car inherits Automobile
    }

    public void Visit(MonsterTruck variable) {
        // MonsterTruck inherits Automobile
    }
}
