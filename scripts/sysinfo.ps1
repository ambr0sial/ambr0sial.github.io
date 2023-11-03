<#
    ASH - System Information Gatherer
    Author: ambr0sial
    Description: This script gathers system information and shows it.
#>

# gathering
function GatherSystemInformation {
    $osInfo = [System.Environment]::OSVersion
    $compInfo = Get-CimInstance Win32_ComputerSystem
    $procInfo = Get-CimInstance Win32_Processor
    $memInfo = Get-CimInstance Win32_PhysicalMemory
    $networkInfo = Get-WmiObject Win32_NetworkAdapterConfiguration | Where-Object { $_.IPAddress -ne $null }
    $diskInfo = Get-CimInstance Win32_LogicalDisk
    $gpuInfo = Get-CimInstance Win32_VideoController
    $monitorInfo = Get-CimInstance Win32_DesktopMonitor
    $biosInfo = Get-CimInstance Win32_BIOS
    $soundInfo = Get-CimInstance Win32_SoundDevice
    $printerInfo = Get-WmiObject Win32_Printer
    $usbInfo = Get-WmiObject Win32_PnPEntity | Where-Object { $_.Caption -like '*USB*' }
    $installedApps = Get-WmiObject Win32_Product
    $services = Get-Service
    $installedHotfixes = Get-HotFix

    return @{
        "Operating System" = $osInfo.VersionString
        "Manufacturer" = $compInfo.Manufacturer
        "Model" = $compInfo.Model
        "Processor" = $procInfo.Name
        "Memory (RAM)" = "{0:N2} GB" -f ($memInfo.Capacity / 1GB)
        "IP Address" = $networkInfo.IPAddress[0]
        "Available Disk Space" = "{0:N2} GB" -f ($diskInfo.FreeSpace[0] / 1GB)
        "Graphics Card" = $gpuInfo.Name
        "Monitor" = $monitorInfo.PNPDeviceID
        "BIOS Version" = $biosInfo.Version
        "Sound Device" = $soundInfo.Name
        "Printer" = $printerInfo.Name
        "USB Devices" = $usbInfo.Caption -join ', '
        "Installed Applications" = $installedApps.Name -join ', '
        "Windows Services" = $services.Name -join ', '
        "Installed Hotfixes" = $installedHotfixes.HotFixID -join ', '
    }
}

# display information
function ShowSystemInformation {
    param (
        [string]$format
    )

    $info = GatherSystemInformation

    if ($format -eq "web") {
        # html and css
        $html = @"
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    background-color: #fff;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                }
                h1 {
                    color: #333;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table, th, td {
                    border: 1px solid #ddd;
                }
                th, td {
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background-color: #4b4564;
                    color: #fff;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>ASH - System Information</h1>
                <table>
                    <tr>
                        <th>Category</th>
                        <th>Value</th>
                    </tr>
"@
        $info.GetEnumerator() | ForEach-Object {
            $html += @"
                    <tr>
                        <td>$($_.Key)</td>
                        <td>$($_.Value)</td>
                    </tr>
"@
        }
        $html += @"
                </table>
            </div>
        </body>
        </html>
"@

        # save html to a file
        $html | Set-Content -Path "SystemInfo.html"

        # open it
        Start-Process "SystemInfo.html"
    } elseif ($format -eq "text") {
        $info | Out-File -FilePath "SystemInfo.txt"
        notepad.exe "SystemInfo.txt"
    } elseif ($format -eq "print") {
        $info.GetEnumerator() | ForEach-Object {
            Write-Host "$($_.Key): $($_.Value)"
        }
        Read-Host "ASH - Press ENTER to exit"
    } else {
        Write-Host "ASH - Invalid format selected."
    }
}

# main menu
do {
    Clear-Host
    Write-Host "ASH - System Information Gatherer"
    Write-Host "1. Generate as webpage (fanciest)"
    Write-Host "2. Save as text file (basic)"
    Write-Host "3. Print to console (hard to read)"
    Write-Host "4. Exit"
    
    $choice = Read-Host "Select an option (1/2/3/4)"
    
    switch ($choice) {
        "1" {
            ShowSystemInformation -format "web"
        }
        "2" {
            ShowSystemInformation -format "text"
        }
        "3" {
            ShowSystemInformation -format "print"
        }
        "4" {
            Write-Host "Exiting.."
        }
        default {
            Write-Host "ASH - Invalid choice. Please select a valid option."
        }
    }
} while ($choice -ne "4")