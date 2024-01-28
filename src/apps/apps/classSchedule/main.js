tailwind.config = {
    darkMode: 'class'
}
SystemJS.config({
    transpiler: 'ts',
    packages:
    {
        '/':
        {
            defaultExtension: 'ts'
        }
    },
    map:
    {
        ts: 'https://unpkg.com/plugin-typescript/lib/plugin.js',
        typescript: 'https://unpkg.com/typescript/lib/typescript.js'
    }
});
SystemJS.import('http://localhost:8080/apps/apps/classSchedule/main.ts');