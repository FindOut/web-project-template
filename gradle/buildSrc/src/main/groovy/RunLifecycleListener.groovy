import org.gradle.api.execution.TaskExecutionListener
import org.gradle.api.Task
import org.gradle.api.tasks.TaskState

class RunLifecycleListener implements TaskExecutionListener {

    def servers = ['Grails', 'Frontend']

    @Override
    void beforeExecute(Task task) {
        if (task.name == 'startServers') {
            task.project.tasks.cleanUpBefore.execute()
            servers.each {
                println "calling start$it"
                task.project.tasks."start$it".execute()
            }
        }
    }

    @Override
    void afterExecute(Task task, TaskState taskState) {
        if (task.name == 'startServers' && task.property('quit') == 'q') {
            task.project.tasks.shutDownServers.execute()
        } else if (task.name == 'startServers') {
            println "Keeping servers running. You can shut them down by using the shutDownServers task"
        }
    }
}
