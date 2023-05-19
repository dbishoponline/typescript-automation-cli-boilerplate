FROM ubuntu:20.04


WORKDIR /workdir

RUN apt-get update && \
    DEBIAN_FRONTEND="noninteractive" apt install -y make python3    \
    python3-pip pipenv curl git unzip jq apache2-utils wget docker.io          \
    tzdata software-properties-common

# Install hashicorp tools and Packer
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | apt-key add - && \
    apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main" && \
    apt-get update && \
    apt-get install packer
    # sudo apt -y install packer=1.8.5

# # Install kubectl v1.22.2
# RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.22.2/bin/linux/amd64/kubectl && \
#     chmod +x ./kubectl &&  mv ./kubectl /usr/local/bin/kubectl


# # Install KOPS. 1.21.1
# RUN curl -LO https://github.com/kubernetes/kops/releases/download/v1.22.1/kops-linux-amd64 && \
#     chmod +x kops-linux-amd64 && mv kops-linux-amd64 /usr/local/bin/kops

# Install pip dependencies. Botocore is included into boto3
RUN pip3 install boto==2.49.0 && \
    pip3 install boto3==1.14.60

# Install awscli
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.0.30.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && ./aws/install

# Install Taskfile
RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

# Install Ansible
RUN add-apt-repository --yes --update ppa:ansible/ansible  && \
    apt -y install ansible

# Install Terraform Switcher
RUN curl -L https://raw.githubusercontent.com/warrensbox/terraform-switcher/release/install.sh | bash
RUN tfswitch 1.1.9

# Install Terragrunt Switcher
RUN curl -L https://raw.githubusercontent.com/warrensbox/tgswitch/release/install.sh | bash
RUN tgswitch 0.38.3

# TODO: Install python version manager - pyenv #TODO: simplify this install
RUN curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
# RUN git clone https://github.com/pyenv/pyenv.git /root/.pyenv
# RUN echo 'export PYENV_ROOT="$HOME/.pyenv"' >> /root/.bashrc
# RUN echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> /root/.bashrc
# RUN echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init --path)"\nfi' >> /root/.bashrc
RUN exec $SHELL

# RUN pyenv update
# RUN source ~/.bashrc

# Requirements
# - Kops - latest version
# - kubectl - latest version
# - ansible - 2.12
# - packer - v1.6.0
# - terraform - v0.12.29
# - Python - 2.7.16
# - pip - 20.1.1
# Python Packages
# - boto - 2.49.0
# - boto3 - 1.8.9
# - botocore - 1.11.9
# 
# RUN apt-get -y install devscripts
# rmadison python
