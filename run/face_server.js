#!/usr/bin/env sh
"\"",`$(echo --% ' |out-null)" >$null;function :{};function dv{<#${/*'>/dev/null )` 2>/dev/null;dv() { #>
echo "1.38.3"; : --% ' |out-null <#'; }; version="$(dv)"; deno_install="$HOME/.deno/$version/"; deno="$deno_install/bin/deno"; run () { exec "$deno" run -qA "$@"; } ; if [ -x "$deno" ]; then run "$0" "$@"; elif [ -f "$deno" ]; then chmod +x "$deno" && run "$0" "$@"; fi; bin_dir="$HOME/.deno/$version/bin"; exe="$bin_dir/deno"; has () { command -v "$1" >/dev/null; } ; if ! has unzip; then if ! has apt-get; then  has brew && brew install unzip; else  if [ "$(whoami)" = "root" ]; then  apt-get install unzip -y; elif has sudo; then  echo "Can I install unzip for you? (its required for this command to work) ";read ANSWER;echo;  if [ "$ANSWER" =~ ^[Yy] ]; then sudo apt-get install unzip -y; fi; elif has doas; then  echo "Can I install unzip for you? (its required for this command to work) ";read ANSWER;echo;  if [ "$ANSWER" =~ ^[Yy] ]; then  doas apt-get install unzip -y; fi; fi;  fi;  fi;  if ! has unzip; then  echo ""; echo "So I couldn't find an 'unzip' command"; echo "And I tried to auto install it, but it seems that failed"; echo "(This script needs unzip and either curl or wget)"; echo "Please install the unzip command manually then re-run this script"; exit 1; fi;  repo="denoland/deno"; if [ "$OS" = "Windows_NT" ]; then target="x86_64-pc-windows-msvc"; else :;  case $(uname -sm) in "Darwin x86_64") target="x86_64-apple-darwin" ;; "Darwin arm64") target="aarch64-apple-darwin" ;; "Linux aarch64") repo="LukeChannings/deno-arm64"; target="linux-arm64" ;; "Linux armhf") echo "deno sadly doesn't support 32-bit ARM. Please check your hardware and possibly install a 64-bit operating system."; exit 1 ;; *) target="x86_64-unknown-linux-gnu" ;; esac; fi; deno_uri="https://github.com/$repo/releases/download/v$version/deno-$target.zip"; exe="$bin_dir/deno"; if [ ! -d "$bin_dir" ]; then mkdir -p "$bin_dir"; fi; if ! curl --fail --location --progress-bar --output "$exe.zip" "$deno_uri"; then if ! wget --output-document="$exe.zip" "$deno_uri"; then echo "Howdy! I looked for the 'curl' and for 'wget' commands but either I didn't see them, or using them failed. Please install/update one of them, otherwise I have no way to install the missing deno version needed to run this code"; exit 1; fi; fi; unzip -d "$bin_dir" -o "$exe.zip"; chmod +x "$exe"; rm "$exe.zip"; run "$0" "$@"; #>}; $DenoInstall = "${HOME}/.deno/$(dv)";     $BinDir = "$DenoInstall/bin";     $DenoExe = "$BinDir/deno.exe";     if (-not(Test-Path -Path "$DenoExe" -PathType Leaf)) {         $DenoZip = "$BinDir/deno.zip";         $DenoUri = "https://github.com/denoland/deno/releases/download/v$(dv)/deno-x86_64-pc-windows-msvc.zip";          [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;          if (!(Test-Path $BinDir)) {             New-Item $BinDir -ItemType Directory | Out-Null;         };                  Function Test-CommandExists {             Param ($command);             $oldPreference = $ErrorActionPreference;             $ErrorActionPreference = "stop";             try {if(Get-Command "$command"){RETURN $true}}             Catch {Write-Host "$command does not exist"; RETURN $false};             Finally {$ErrorActionPreference=$oldPreference};         };                  if (Test-CommandExists curl) {             curl -Lo $DenoZip $DenoUri;         } else {             curl.exe -Lo $DenoZip $DenoUri;         };                  if (Test-CommandExists curl) {             tar xf $DenoZip -C $BinDir;         } else {             tar -Lo $DenoZip $DenoUri;         };                  Remove-Item $DenoZip;          $User = [EnvironmentVariableTarget]::User;         $Path = [Environment]::GetEnvironmentVariable('Path', $User);         if (!(";$Path;".ToLower() -like "*;$BinDir;*".ToLower())) {             [Environment]::SetEnvironmentVariable('Path', "$Path;$BinDir", $User);             $Env:Path += ";$BinDir";         }     }; & "$DenoExe" run -qA "$PSCommandPath" @args; Exit $LastExitCode; <# 
# */0}`;
import { FileSystem, glob } from "https://deno.land/x/quickr@0.6.62/main/file_system.js"
import { run, hasCommand, throwIfFails, zipInto, mergeInto, returnAsString, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo, } from "https://deno.land/x/quickr@0.6.62/main/run.js"
import { Console, clearAnsiStylesFrom, black, white, red, green, blue, yellow, cyan, magenta, lightBlack, lightWhite, lightRed, lightGreen, lightBlue, lightYellow, lightMagenta, lightCyan, blackBackground, whiteBackground, redBackground, greenBackground, blueBackground, yellowBackground, magentaBackground, cyanBackground, lightBlackBackground, lightRedBackground, lightGreenBackground, lightYellowBackground, lightBlueBackground, lightMagentaBackground, lightCyanBackground, lightWhiteBackground, bold, reset, dim, italic, underline, inverse, strikethrough, gray, grey, lightGray, lightGrey, grayBackground, greyBackground, lightGrayBackground, lightGreyBackground, } from "https://deno.land/x/quickr@0.6.62/main/console.js"

import archy from "https://deno.land/x/archaeopteryx@1.0.8/mod.ts"
import * as yaml from "https://deno.land/std@0.168.0/encoding/yaml.ts"
import { selectOne } from "../face_server/js_tools/generic/input_tools.js"
import { project } from "../face_server/js_tools/project.js"

const { projectRoot, settingsPath, certFile, keyFile, websiteEntrypoint } = project

let server
const watcher = Deno.watchFs(settingsPath, { recursive: true })
const updateInfo = async ()=>{
    const settings = project.settings

    if (server) {
        try {
            server.close()
        } catch (error) {
        }
    }
    
    server = await archy({
        port: settings.cameraPortNumber,
        secure: true,
        certFile,
        keyFile,
        root: FileSystem.parentPath(websiteEntrypoint),
        allowAbsolute: true,
    })

    const ipAddresses = Deno.networkInterfaces().filter((each)=>each.family=="IPv4").map((each)=>each.address).filter(each=>each!="127.0.0.1").slice(0,1)

    let ipAddress
    if (ipAddresses.length == 1) {
        ipAddress = ipAddresses[0]
    } else {
        ipAddress = await selectOne({
            message: `IDK which is your local ip address, so please pick one (guess if you have too)`,
            showList: true,
            showInfo: false,
            options: ipAddresses.map(each=>`${each}`),
            autocompleteOnSubmit: true,
        })
    }

    // 
    // patch rb_server.launch (inject correct cert.pem and key.pem paths, and default host address)
    // 
    console.log(`#`)
    console.log(`# camera sever at: https://${ipAddress}:${settings.cameraPortNumber}`)
    console.log(`#`)
}
updateInfo()
for await (const event of watcher) {
    if (event.kind === 'modify') {
        updateInfo()
    }
}

// (this comment is part of deno-guillotine, dont remove) #>