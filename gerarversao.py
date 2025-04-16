import re
import os
import tempfile
import subprocess

def increment_version(version):
    """Incrementa a versão Docker seguindo o padrão 1.0.1 -> 1.0.2 ... 1.0.9 -> 1.1.0."""
    major, minor, patch = map(int, version.split('.'))
    if patch == 9:
        patch = 0
        if minor == 9:
            minor = 0
            major += 1
        else:
            minor += 1
    else:
        patch += 1
    return f"{major}.{minor}.{patch}"

def generate_docker_script(filename, port, current_version):
    """Gera o script Docker com a próxima versão."""
    filename = filename.replace("-", "_")  # Substitui hifens por underscores
    new_version = increment_version(current_version)

    script = f"""
    ------------------------------------------------------------
    BUILD AND SAVE IMAGE
    ------------------------------------------------------------
    docker build -t {filename}:{new_version} .
    docker save -o {filename}-{new_version}.tar {filename}:{new_version}

    ------------------------------------------------------------
    STOP AND REMOVE EXISTING CONTAINER
    ------------------------------------------------------------
    docker stop {filename}_container
    docker rm {filename}_container
    docker rmi {filename}:v{current_version}

    ------------------------------------------------------------
    LOAD AND RUN NEW CONTAINER
    ------------------------------------------------------------
    cd {filename}
    docker load -i {filename}-{new_version}.tar
    docker run -d \
    --name {filename}_container \
    -p {port}:{port} -p 10000:10000 \
    -v /etc/localtime:/etc/localtime:ro \
    -e TZ=America/Sao_Paulo \
    {filename}:{new_version}
    ------------------------------------------------------------
    """
    return script.strip()

def create_temp_file(content):
    """Cria um arquivo temporário que será deletado no próximo reboot."""
    temp_file = tempfile.NamedTemporaryFile(delete=False, mode='w', suffix='.txt')
    temp_file.write(content)
    temp_file.close()

    # Abre o Bloco de Notas
    subprocess.Popen(["notepad", temp_file.name], close_fds=True)

    # Marca o arquivo para exclusão no próximo reinício do sistema
    os.system(f"attrib +h {temp_file.name}")  # Opcional: oculta o arquivo temporário
    os.system(f"schtasks /Create /TN DeleteTempFile /TR 'cmd /c del {temp_file.name}' /SC ONSTART /F")

    print(f"O arquivo temporário será deletado no próximo reinício do sistema: {temp_file.name}")

# Exemplo de uso:
if __name__ == "__main__":
    # Substitua pelo nome da imagem e porta desejados
    filename = "sistema-ponto-api"
    port = 9999
    current_version = "1.1.2"  # Atualize aqui para a versão atual

    docker_script = generate_docker_script(filename, port, current_version)
    create_temp_file(docker_script)
