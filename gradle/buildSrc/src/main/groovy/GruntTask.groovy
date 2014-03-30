import org.gradle.api.tasks.Exec
import org.apache.tools.ant.taskdefs.condition.Os

class GruntTask extends Exec {
    public GruntTask() {
        super()
        if( Os.isFamily(Os.FAMILY_WINDOWS) ){
            this.setExecutable( "grunt.cmd" )
        }
        else{
           this.setExecutable("../frontend/node_modules/grunt-cli/bin/grunt")
        }
    }
    public void setGruntArgs(String gruntArgs) {
        this.args = "$gruntArgs".trim().split(" ") as List
    }
}

