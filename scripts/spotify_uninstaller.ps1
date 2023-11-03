<#
    ASH - Spotify Uninstaller
    Author: ambr0sial
    Description: This script uninstalls Spotify.
#>

# spotify path (used to print the current version)
$spotifyExePath = Join-Path $env:APPDATA 'Spotify\Spotify.exe'
if (Test-Path -Path $spotifyExePath) {
    $versionInfo = (Get-Item $spotifyExePath).VersionInfo
    $currentVersion = $versionInfo.ProductVersion
}

Write-Host "[CURRENT SPOTIFY VERSION: $currentVersion]" -ForegroundColor Magenta

# reset permissions
if (Test-Path "$env:localappdata\Spotify\Update") {
    icacls "$env:localappdata\Spotify\Update" /reset /T > $null 2>&1
}

$actions = 0

# uninstalling
if (Test-Path "$env:appdata\Spotify\Spotify.exe") {
    Start-Process -FilePath "$env:appdata\Spotify\Spotify.exe" -ArgumentList "/UNINSTALL /SILENT" -Wait
    $actions++
}

Start-Sleep -Seconds 1

# remove spotify data folders
"$env:appdata\Spotify", "$env:localappdata\Spotify" | ForEach-Object {
    if (Test-Path $_) {
        Remove-Item -Path $_ -Recurse -Force -ErrorAction SilentlyContinue
        $actions++
    }
}

# delete spotifyuninstall.exe
if (Test-Path "$env:temp\SpotifyUninstall.exe") {
    Remove-Item -Path "$env:temp\SpotifyUninstall.exe" -Force -ErrorAction SilentlyContinue
    $actions++
}

if ($actions -eq 0) {
    Write-Host "ASH - Spotify is not installed or not found"
} else {
    Write-Host "ASH - Spotify has been successfully uninstalled"
}