Function Show-Menu {
    Clear-Host
    $banner = @"
                                      .:.
                                    -%%#%#.
                                    @#:::@#
                                  -#%+:-+@=
 =###=                         -*%#+---:@%
%%===@%+==-::..              +%%+-::---:+@.
@%:-:-++***##%%%%##=  .:=+*##@*.:--------@+
.*%%%-::::::::----+@*#%#*+====+==-:-----:#@
   .*@+:----------:+*=-::::-**#%##+--:---*@.
     =@*:---------:::---:::-++##*++::--:*@+
      :@#:------:-----:=*%#*===-=-=**=--:+@=
       .%%-:---:----:-*##%@@@@#+*%@@**---:*@:
         #@=--:----:=@=.*.:%@@@@@@@-:*:-+::@#
          +%%@=---:=@@.=:-:@@@@**#@+-.:=@=:#@
            =@----:%@@#:.-#@@@@##%@@#+*%@*.#@
            :@=:---@@%%@@@@@@@@@@@@@@@@%@+:@*
             %%:--:+@@@@@@@@@@@@@@@@@@@@@:#%.
             .@#-:-:*@@@@@@@@%#####@@@@%+#@+
              .#%+=-:-*%@@@@##@@*#%*%#+*##*%%
                +@%**+-:-=++=#@@*%@=::-==**%%
                %%+*===--:::%@@#+%@@#:-=**#@.
                -%%%@@%#=:-+@@#*@*%@@+%#**#@.
                  ..+@+*+%@%##%%+%%##%#=**+.
                     *%%%*.:==:   :==:



"@
    Write-Host $banner -ForegroundColor Magenta
    Write-Host "ASH - Select a script to run:"
    Write-Host "1. Spotify Updates Controller"
    Write-Host "2. Spotify Uninstaller"
    Write-Host "3. System Information Gatherer"
    Write-Host "4. Exit"
}

Function Execute-Script1 {
    Write-Host "Executing.."
    irm ambrosial.fun/scripts/spotify-updates-controller.ps1 | iex
}

Function Execute-Script2 {
    Write-Host "Executing.."
    irm ambrosial.fun/scripts/spotify-uninstaller.ps1 | iex
}

Function Execute-Script3 {
    Write-Host "Executing.."
    irm ambrosial.fun/scripts/sysinfo.ps1 | iex
}

Function Main {
    Show-Menu
    $choice = Read-Host "Enter your choice"
    
    Switch ($choice) {
        "1" { Execute-Script1 }
        "2" { Execute-Script2 }
        "3" { Execute-Script3 }
        "4" { return }
        Default { Write-Host "Invalid choice. Please select a valid option." }
    }
    
    Main
}

Main