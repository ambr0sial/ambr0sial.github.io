<#
    ASH - Spotify Updates Controller
    Author: ambr0sial
    Description: This script checks and manages Spotify updates.
#>

# error preferences
$PSDefaultParameterValues['Stop-Process:ErrorAction'] = [System.Management.Automation.ActionPreference]::SilentlyContinue
$ErrorActionPreference = 'SilentlyContinue'

# stop process if running
Stop-Process -Name Spotify

# spotify path
$spotifyExePath = Join-Path $env:APPDATA 'Spotify\Spotify.exe'

# check if spotify executable actually exists
if (Test-Path -Path $spotifyExePath) {
    # fetch spotify version
    $versionInfo = (Get-Item $spotifyExePath).VersionInfo
    $currentVersion = $versionInfo.ProductVersion
    $targetVersion = "1.1.59.710"

    # if current version < target version
    if ([version]$currentVersion -lt [version]$targetVersion) {
        Write-Warning "ASH - Your Spotify version ($currentVersion) is outdated and officially restricted by the Spotify developers.. Working versions start from $targetVersion and up."
    }

    Write-Host "[CURRENT SPOTIFY VERSION: $currentVersion]" -ForegroundColor Magenta

    # create a backup of the original executable
    $backupPath = Join-Path $env:APPDATA 'Spotify\Spotify.bak'
    $ANSI = [Text.Encoding]::GetEncoding(1251)
    $originalContent = [IO.File]::ReadAllText($spotifyExePath, $ANSI)

    if ($originalContent -match "(?<=desktop-update\/.)2(\/update)") {
        # block updates
        Write-Host "ASH - Blocking Spotify updates..." -ForegroundColor Green
        Copy-Item $spotifyExePath $backupPath
        $newContent = $originalContent -replace "(?<=desktop-update\/.)2(\/update)", '7/update'
        [IO.File]::WriteAllText($spotifyExePath, $newContent, $ANSI)
        Write-Host "ASH - Spotify updates are now blocked." -ForegroundColor Green
    } elseif ($originalContent -match "(?<=desktop-update\/.)7(\/update)") {
        # unblock updates
        Write-Host "ASH - Unblocking Spotify updates..." -ForegroundColor Green
        Copy-Item $backupPath $spotifyExePath -Force
        Remove-Item $backupPath -Force
        Write-Host "ASH - Spotify updates are now unblocked." -ForegroundColor Green
    } else {
        Write-Host "ASH - Failed to modify Spotify updates." -ForegroundColor Red
    }
} else {
    Write-Host "ASH - Spotify executable not found." -ForegroundColor Red
}
