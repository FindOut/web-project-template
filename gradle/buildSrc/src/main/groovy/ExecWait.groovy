class ExecWait extends org.gradle.api.DefaultTask {
    String command
    String ready
    String directory

    @org.gradle.api.tasks.TaskAction
    def spawnProcess() {

        ProcessBuilder builder = new ProcessBuilder(command.split(' '))
        builder.redirectErrorStream(true)
        builder.directory(new File(directory))
        Process process = builder.start()

        InputStream stdout = process.getInputStream()
        BufferedReader reader = new BufferedReader(new
        InputStreamReader(stdout))

        def line
        while ((line = reader.readLine()) != null) {
            println line
            if (line.contains(ready)) {
                println "$command is ready"
                break;
            }
        }
    }
}
