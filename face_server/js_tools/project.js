#!/usr/bin/env -S deno run --allow-all
import { FileSystem, glob } from "https://deno.land/x/quickr@0.6.62/main/file_system.js"
import { run, hasCommand, throwIfFails, zipInto, mergeInto, returnAsString, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo, } from "https://deno.land/x/quickr@0.6.62/main/run.js"
import { Console, clearAnsiStylesFrom, black, white, red, green, blue, yellow, cyan, magenta, lightBlack, lightWhite, lightRed, lightGreen, lightBlue, lightYellow, lightMagenta, lightCyan, blackBackground, whiteBackground, redBackground, greenBackground, blueBackground, yellowBackground, magentaBackground, cyanBackground, lightBlackBackground, lightRedBackground, lightGreenBackground, lightYellowBackground, lightBlueBackground, lightMagentaBackground, lightCyanBackground, lightWhiteBackground, bold, reset, dim, italic, underline, inverse, strikethrough, gray, grey, lightGray, lightGrey, grayBackground, greyBackground, lightGrayBackground, lightGreyBackground, } from "https://deno.land/x/quickr@0.6.62/main/console.js"

import * as yaml from "https://deno.land/std@0.168.0/encoding/yaml.ts"

const projectRoot = FileSystem.makeAbsolutePath(await FileSystem.walkUpUntil(".gitignore", FileSystem.thisFolder))
const settingsPath = `${projectRoot}/face_server/settings.yaml`
const certFile = FileSystem.makeAbsolutePath(`${projectRoot}/face_server/helpers/cert.pem`)
const keyFile = FileSystem.makeAbsolutePath(`${projectRoot}/face_server/helpers/key.pem`)
const websiteEntrypoint = FileSystem.makeAbsolutePath(`${FileSystem.thisFolder}/../index.html`)

export const project = {
    projectRoot,
    settingsPath,
    certFile,
    keyFile,
    websiteEntrypoint,
    get settings() {
        return yaml.parse(FileSystem.sync.read(settingsPath)).project
    }
}