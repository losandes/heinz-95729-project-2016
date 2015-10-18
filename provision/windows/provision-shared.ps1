function ConfirmStep ($question, $timeout) {

    if ($question -eq '') {
        return $false
    }

    if ($force) {
        return $true
    }

    $yes = '6'
    $no = '7'
    $msgBoxTimeout='-1'

    $answer = $msgBoxTimeout
    try {
        $msgBox = New-Object -ComObject WScript.Shell
        $answer = $msgBox.Popup($question, $timeout, "Do It", 0x4)
    }
    catch {

    }

    if ($answer -eq $yes -or $answer -eq $msgBoxTimeout) {
        write-host 'returning true'
        return $true
    }

    return $false
}
