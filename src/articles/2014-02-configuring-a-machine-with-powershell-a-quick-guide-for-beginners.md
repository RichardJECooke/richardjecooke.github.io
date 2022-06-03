---
layout: layout_post.html
title: Configuring a machine with PowerShell
date: 2014-02-04 19:05:17
tags: post
# tags:
#   - iis
#   - powershell
#   - windows service
# categories:
#   - powershell
#   - programming
---

This article will show you everything you need to know to use PowerShell to setup Windows services and IIS applications.  It's aimed at complete beginners and is as concise as possible.

## Why do this in PowerShell?

I wrote the script discussed in this article to completely automate the configuration of our virtual machines. Whenever a new environment is created for testing or deployment all that needs to be done is to run a script, rather than install and configure everything manually. Why PowerShell? Because it's the Microsoft standard tool for system administration.

## Install PowerShell

Google the latest version of the Windows Management Framework, download and install it.  [Version 4 of PowerShell](http://www.microsoft.com/en-za/download/details.aspx?id=40855) is the latest at the time of writing.

**WARNING** Some of the modules available in PowerShell depend on the version of Windows you have, not the version of PowerShell.  If you find a function you are trying to use just isn't working check in the MSDN documentation to see if its module is in your version of Windows.

## Windows PowerShell ISE (integrated scripting environment)

The ISE is a useful text editor for your scripts and can run them too.

### Hotkeys
- Ctrl 1 to Ctrl 3 change the arrangement of the script and console windows
- Ctrl R switches between the script and console windows

**WARNING** The ISE does not clear the PowerShell session whenever you click run. If you make a change to a script used by another script the change won't be used. This is because all the functions have already been defined in the session. Instead you have to use only one file, or restart the ISE.

## Allow PowerShell to run scripts

Start a PowerShell command window and run the following command `Set-Executionpolicy RemoteSigned`

This will allow you to run scripts in the current folder by typing `./MyScript.ps1`

## Make some configuration settings

Let's look at a basic script

```powershell
<#
Purpose:
    This script configures a machine.
#>


# The line below ensures we have correct version, it is not just a comment
#requires -Version 3.0

#region Settings

$folders = @(
    [pscustomobject] @{name="Books"; file = "C:\temp\Books"; user = "EVERYONE"; };
    [pscustomobject] @{name="Sound"; file = "C:\temp\Sound"; user = "EVERYONE"; };
)

#endregion

cls
Write-Host "Starting program"
foreach ($item in $folders)
{
    Write-Host $item.file
}
```

- Line 1 shows multi-line comments.
- Line 6 shows single line comments.
- Line 7 shows an interpreter directive - the script won't run unless PowerShell is the right version.
- Lines 9 and 16 define a region that you can minimise in the ISE to keep your script uncluttered.
- Line 11 defines a variable. Variables start with $. The @ symbol means the following lines are all one command (otherwise PowerShell thinks one line is one command; there are no semicolon endings). This line also defines an array.  It casts two anonymous dictionaries of three strings to a pscustomerobject.
- Line 18 shows that DOS commands are included in PowerShell, and clears the screen.
- Line 19 allows you to write to the screen and the next few lines show you a foreach loop.

## Put the configuration in a separate file

Let's put the configuration arrays in a separate file so we can edit them separately later. Make a new script called Configuration.ps1 and add these lines:

```powershell
$version = 1

$folders = @(
    pscustomobject @{name="Books"; file = "C:\temp\Books"; user = "EVERYONE"; };
    pscustomobject @{name="Sound"; file = "C:\temp\Sound"; user = "EVERYONE"; };
)

$windowsServices = @(
    pscustomobject @{name="Monitoring Service";     file = "C:\temp\Movie\SystemsMonitor.exe";                  user = "NetworkService";         password = "1gn0red" };
)
```
We can then make a script that uses these settings like so:

```powershell
Write-Host $version
Write-Host "Importing configuration settings"
. $PSScriptRoot\Configuration.ps1
Write-Host $version
```

**WARNING** Note that line 1 won't work because the variable hasn't been defined yet. PowerShell doesn't look forward through a file - functions and variables must be declared before being used. Line 3 is called dot sourcing. It's as if the other script file had been copied and pasted into that line. It's more neat to make your script libraries into standalone reusable modules, but we'll get to that later.

## Functions and parameters

Let's look at a basic function and its use:

```powershell
function Get-ValueOrUseDefault($message, $default)
{
    $input = Read-Host $message
    if ($input -eq $null) { return $default }
    if ($input -eq "")    { return $default }
    return $input
}

$scheduledTaskUser = "Richard"
$scheduledTaskUser = Get-ValueOrUseDefault ("Enter the user to run scheduled tasks as, or push enter to use the default value '" + $scheduledTaskUser + "'") (scheduledTaskUser)
```

Functions work as you'd expect except for a couple of surprises:

* Line 1: PowerShell expects functions to start with a verb from the list found by running Get-Verb.  It won't error but will warn you.
* Line 4: Comparison operators are -eq for =, -ne for <>, -gt for >, and so on. Null, true, and false are represented by $null, $true, and $false.
* Line 10: Functions are not called with parameters in brackets, nor separated by commas.  Parameters are separated only by whitespace. Brackets are used to wrap something that contains spaces into one parameter.
* Parameters are passed by value unless you preceed the formal and actual parameters by ref. If the function can't find a variable in the parameter list it will create a global variable (like Javascript if you create a variable without using 'var').

## Modules & logging

PowerShell groups code for reuse by making modules (similar to packages or assemblies in other languages). Here's how to import and use a logging module. Download and unzip this logging [module](http://gallery.technet.microsoft.com/scriptcenter/PSLog-Send-messages-to-a-db389927) into a subfolder called PSLog beneath your script. Notice that the folder contains a module manifest file and a code file.  To make your own module just copy this folder and rename the files and manifest information. To import and use the module use this code:

```powershell
Write-Host "Creating log file"
Import-Module $PSScriptRoot\PSLog
Start-Log -LogName PrepareMachineForDTS -LogPath $PSScriptRoot -Level All
Write-Host "I'm in a file and on the screen"
```

Line 1 will just write to the screen.
The module is then imported in line 2 ($PSScriptRoot is the folder the script is in).
Line 3 activates it to create a log file and writes further Write-Host output to the file as well as the screen.

## Calling DOS commands

If you're not using Windows 8 or the server version you'll find many missing PowerShell commands and you'll have to rely on the standard DOS management applications.  Calling them with the correct parameters can be tricky. PowerShell is usually pretty clever and correctly surrounds a variable's content with " " when passing it as parameter.  But if it doesn't work put the whole command in a string and run it like this:

```powershell
$command = "cmd /c '" + "schtasks /create /tn `"" + $item.name + "`" /TR  `"" + $item.file + "`" /RU " + $scheduledTaskUser + " /RP " + $scheduledTaskUserPassword + " " + $item.schedule + "'"
$output = Invoke-Expression $command
Write-Host $output
```

## A full script with useful functions

That's about it. We've covered the basics of PowerShell and all the suprises for a novice user. The code below gives you a lot of useful functions to create folders, share folders on the network, create IIS applications, create scheduled tasks, and create Windows services. It's quite simple but if you have questions please ask them in a comment at the bottom of this page.

```powershell
$folders  = @(
    pscustomobject @{file = "C:\temp\movie";   };
    pscustomobject @{file = "C:\temp\sound";   };
)

$sharedFolders = @(
    pscustomobject @{name="movie"; file = "C:\movie"; user = "EVERYONE";     };
    pscustomobject @{name="sound"; file = "C:\temp\sound"; user = "EVERYONE";     };
)

$scheduledTasks = @(
    pscustomobject @{name="Run movies"; file = "C:\temp\movie\Go.bat";  enabled = $true; schedule=" /ST 19:00 /SC DAILY "  };
)

$windowsServices = @(
    pscustomobject @{name="Monitor movie";     file = "C:\temp\movie"; user = "NetworkService"; password = "1gn0red" };
)

$virtualDirectories = @(
    pscustomobject @{name="MovieSite"; file="C:\temp\movie\webapp"; user="NetworkService"; password = "1gn0red";   authentication="Windows"          };
)

# The line below ensures we have correct version, it is not just a comment
#requires -Version 3.0

#region Functions
function Get-ParentFolder($folder)
{
    return (Split-Path -parent $folder)
}

function Confirm-WindowsServiceExists($name)
{
    if (Get-Service $name -ErrorAction SilentlyContinue)
    {
        return $true
    }
    return $false
}

function Remove-WindowsServiceIfItExists($name)
{
    $exists = Confirm-WindowsServiceExists $name
    if ($exists)
    {
        Write-Host "Remove Windows service - " $name
        $output = (sc.exe delete $name)
        Write-Host $output
    }
}

function Confirm-ScheduledTaskExists($name)
{
    schtasks /query /TN $name 2>&1>null       #hide error and standard output from displaying
    return $LastExitCode -eq 0       #if task exists exit code won't be an error
}

function Remove-ScheduledTaskIfItExists($name)
{
    $exists = Confirm-ScheduledTaskExists $name
    if ($exists)
    {
        $output = (schtasks /delete /f /tn $name)  #/f = suppress confirmation message so it can delete without user input
        Write-Host $output
    }
}

function Initialize-Logging
{
    $parentFolder = Get-Parent-Folder $PSScriptRoot
    Import-Module $parentFolder\PSLog       # allows us to write a log file of this machine setup.  sourced from: http://gallery.technet.microsoft.com/scriptcenter/PSLog-Send-messages-to-a-db389927
    Start-Log -LogName PrepareMachineForDTS -LogPath $parentFolder -Level All
}

function Protect-Password($password)
{
    return ($password | ConvertTo-SecureString -asPlainText -Force)
}

function Add-WindowsServices($windowsServices)
{
    Write-Host "Creating Windows services"
    foreach ($item in $windowsServices)
    {
        Write-Host "Adding Windows service - " $item.name
        $securePassword = Protect-Password $item.password
        $user = New-Object System.Management.Automation.PSCredential ($item.user, $securePassword )
        New-Service -name $item.name -binaryPathName $item.file -credential $user
    }
}

function Add-ScheduledTasks($scheduledTaskUser, $scheduledTaskUserPassword, $scheduledTasks)
{
    Write-Host "Creating scheduled tasks"

    foreach ($item in $scheduledTasks)
    {
        $command = "cmd /c '" + "schtasks /create /tn `"" + $item.name + "`" /TR  `"" + $item.file + "`" /RU " + $scheduledTaskUser + " /RP " + $scheduledTaskUserPassword + " " + $item.schedule + "'"
        $command
        $output = Invoke-Expression $command
        Write-Host $output

        if ($item.enabled -eq $true)
        {
            continue
        }
        $command = "schtasks /change /tn `"" + $item.name + "`" /DISABLE"
        $command
        $output = Invoke-Expression $command
        Write-Host $output
    }
}

function Remove-ScheduledTasks($scheduledTasks)
{
    Write-Host "Deleting scheduled tasks if they exist"
    foreach ($item in $scheduledTasks)
    {
        Remove-ScheduledTaskIfItExists($item.name)
    }
}

function Remove-WindowsServices($services)
{
    Write-Host "Deleting Windows services if they exist"
    foreach ($item in $services)
    {
        Remove-WindowsServiceIfItExists($item.name)
    }
}

function Get-ValueOrUseDefault($message, $default)
{
    $input = Read-Host $message
    if ($input -eq $null) { return $default }
    if ($input -eq "")    { return $default }
    return $input
}

function Add-AppPool($virtualDirectory)
{
    Write-Host "Creating IIS app pool - " $virtualDirectory.name
    $poolName = "IIS:\AppPools\" + $virtualDirectory.name
    $pool = New-Item $poolName
    $pool.processModel.userName = $virtualDirectory.user
    $pool.processModel.password = $virtualDirectory.password
    $pool.processModel.identityType = "SpecificUser"
    $pool.processModel.idleTimeout = TimeSpan "0.00:00:00"
    $pool.managedRuntimeVersion = "4.0"
    $pool.recycling.periodicRestart.time = TimeSpan "00:00:00"
    $pool | Set-Item
}

function Add-VirtualDirectory($virtualDirectory)
{
    Write-Host "Creating IIS virtual directory - " $virtualDirectory.name
    $name = "IIS:\Sites\Default Web Site\" + $virtualDirectory.name
    New-Item $name -Type Application -physicalPath $virtualDirectory.file
    Set-ItemProperty $name -Name applicationPool -Value $virtualDirectory.name
}

function Add-WindowsAuthenticationToAppIfNecessary($virtualDirectory)
{
    if ($virtualDirectory.authentication -ne "Windows")
    {
        return
    }
    Write-Host "Setting Windows authentication for IIS app - " $virtualDirectory.name
    $command = $env:SystemRoot + "\system32\inetsrv\AppCmd.exe set config `"Default Web Site/"+$virtualDirectory.name+"`" -section:system.webServer/security/authentication/anonymousAuthentication /enabled:`"False`" /commit:apphost"
    Write-Host $command
    Invoke-Expression $command

    $command = $env:SystemRoot + "\system32\inetsrv\AppCmd.exe set config `"Default Web Site/"+$virtualDirectory.name+"`" -section:system.webServer/security/authentication/windowsAuthentication /enabled:`"True`" /commit:apphost"
    Write-Host $command
    Invoke-Expression $command
}

function Add-VirtualDirectories($virtualDirectories)
{
    C:\Windows\system32\inetsrv\AppCmd.exe unlock config  /section:security/authentication/anonymousAuthentication # allow us to make changed to authentication types of apps
    C:\Windows\system32\inetsrv\AppCmd.exe unlock config  /section:security/authentication/windowsAuthentication   # allow us to make changed to authentication types of apps

    foreach ($virtualDirectory in $virtualDirectories)
    {
        Add-AppPool $virtualDirectory
        Add-VirtualDirectory $virtualDirectory
    }
}

function Remove-VirtualDirectories($virtualDirectories)
{
    foreach ($item in $virtualDirectories)
    {
        $pool = "IIS:\AppPools\" + $item.name
        if (Test-Path $pool)
        {
            Write-Host "Removing IIS app pool - " $item.name
            Remove-Item $pool -Force -Recurse
        }

        $exists = Confirm-VirtualDirectoryExists $item.name
        if ($exists -eq $false -or $item.name -eq "" -or $item.name -eq $null)
        {
            continue
        }
        Write-Host "Removing IIS virtual directory - " $item.name
        $parameter = "IIS:\Sites\Default Web Site\" + $item.name
        Remove-Item $parameter -Recurse
    }
}

function Confirm-VirtualDirectoryExists($name)
{
    $parameter = "IIS:\Sites\Default Web Site\" + $item.name
    Get-Item $parameter -ErrorAction SilentlyContinue
    return ($?) #if last command was successful return true
}

function Get-WindowsServiceUsers($windowsServices)
{
    foreach ($item in $windowsServices)
    {
        $message =   "Enter the user to run the Windows service '" + $item.name + "' as, or push enter to use the default value '" + $item.user + "'"
        $item.user = Get-ValueOrUseDefault $message $item.user
        Write-Host ""

        $message =   "Enter the password for this user, or push enter to use the default value '" + $item.password + "'"
        $item.password = Get-ValueOrUseDefault $message $item.password
        Write-Host ""
    }
}

function Get-IisUsers($virtualDirectories)
{
    foreach ($item in $virtualDirectories)
    {
        $message =   "Enter the user to run the IIS app '" + $item.name + "' as, or push enter to use the default value '" + $item.user + "'"
        $item.user = Get-ValueOrUseDefault $message $item.user
        Write-Host ""

        $message =   "Enter the password for this user, or push enter to use the default value '" + $item.password + "'"
        $item.password = Get-ValueOrUseDefault $message $item.password
        Write-Host ""
    }
}

function Add-FolderIfItDoesNotExist($path)
{
    $folderExists = Test-Path -Path $path
    if ($folderExists -eq $false) # leave folder alone if it exists
    {
        Write-Host "Adding new folder " $path
        $output = New-Item -ItemType Directory -Path $path
        Write-Host $output
    }
}

function Add-Folders($folders)
{
    foreach ($item in $folders)
    {
        Add-FolderIfItDoesNotExist $item.file
    }
}

function Add-SharedFolders($sharedFolders)
{
    Write-Host "Adding folders shared on network"

    $share = WMICLASS "WIN32_Share"

    foreach ($item in $sharedFolders)
    {
        Add-FolderIfItDoesNotExist $item.file

        $command = "(Get-WmiObject -Class Win32_Share -ComputerName . -Filter `"Name='" + $item.name + "'`")"
        $shareExists = Invoke-Expression $command
        if ($shareExists -ne  $null)  # remove share if it exists, in case it points to the wrong folder
        {
            Write-Host "Deleting network share - " $item.name
            $command = "(Get-WmiObject -Class Win32_Share -ComputerName . -Filter `"Name='" + $item.name + "'`").InvokeMethod(`"Delete`",`$null)"
            $command
            $output = Invoke-Expression $command
            Write-Host $output
        }

        Write-Host "Adding network share - " $item.name
        #$output = $share.Create($item.file, $item.name, 0)  # the powershell way of doing it doesn't grant rights
        $command = "cmd /c ' net share `"" + $item.name + "`"=`""+$item.file+"`" /GRANT:"+$item.user+",FULL'"
        $output = Invoke-Expression $command
        Write-Host $output
    }
}

function Open-FireWallPort
{
    Write-Host "Opening firewall port 8085 for TCP on the domain only."
    $port = New-Object -ComObject HNetCfg.FWOpenPort
    $port.Port = 8085
    $port.Name = 'Movie port has been opened'
    $port.Enabled = $true

    $fwMgr = New-Object -ComObject HNetCfg.FwMgr
    $profile=$fwMgr.LocalPolicy.GetProfileByType(0)  #domain profile only
    $profile.GloballyOpenPorts.Add($port)
}

#endregion

cls
Write-Host "Starting program"

Write-Host "Creating log file"
Import-Module $PSScriptRoot\PSLog       # allows us to write a log file of this machine setup.  sourced from: http://gallery.technet.microsoft.com/scriptcenter/PSLog-Send-messages-to-a-db389927
Start-Log -LogName PrepareMachineForDTS -LogPath $PSScriptRoot -Level All
Write-Host "___________________________________________________"

$scheduledTaskUser = "NetworkService"
$scheduledTaskUserPassword = "1gn0r3d"

Write-Host "Importing PowerShell IIS functions"
Import-Module WebAdministration

Write-Host "Getting all settings needed from the user"
Get-WindowsServiceUsers $windowsServices
Get-IisUsers($virtualDirectories)
$scheduledTaskUser = Get-ValueOrUseDefault ("Enter the user to run scheduled tasks as, or push enter to use the default value '" + $scheduledTaskUser + "'") (scheduledTaskUser)
$scheduledTaskUserPassword = Get-ValueOrUseDefault ("Enter the password for this user, or push enter to use the default value '" + $scheduledTaskUserPassword + "'") (scheduledTaskUserPassword)

Open-FireWallPort

Add-Folders $folders
Add-SharedFolders $sharedFolders

Remove-ScheduledTasks $scheduledTasks
Add-ScheduledTasks $scheduledTaskUser $scheduledTaskUserPassword $scheduledTasks

Remove-WindowsServices $windowsServices
Add-WindowsServices $windowsServices

Remove-VirtualDirectories $virtualDirectories
Add-VirtualDirectories $virtualDirectories

Write-Host "Closing log file"
Stop-Log
Write-Host "Log closed. Program finished"

 

# The line below ensures we have correct version, it is not just a comment
#requires -Version 3.0

#region Settings

$apiSourceFolder = ".\src\WebAPI\*"
$apiDeploymentFolder = "\\10.10.10.30\Web.Api.V1.Dev"
$configFilename = $apiDeploymentFolder + "\Web.config"

#endregion

cls
Write-Host "Starting program"

Write-Host "Copy contents of web api folder to dev"
Copy-Item $apiSourceFolder $apiDeploymentFolder -recurse -force

Write-Host "Change dev config file"
(Get-Content $configFilename).replace('connectionString="Dsn=DEV64"','connectionString="Dsn=CLB-DEV"') | Set-Content $configFilename

Write-Host "Finished"
```
