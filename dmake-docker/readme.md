# RUN
- docker build  -t dmake-shell -f dmake.dockerfile --platform=linux/amd64 .
- cd to the project's root
- docker run -it --rm -v $(pwd):/root -v ~/.ssh:/root/.ssh:ro -v ~/.aws:/root/.aws:ro dmake-shell bash
- tfswitch 1.1.9
- tgswitch 0.38.3


<!-- IDK what kind autorizstion do you use -->
copy ~/.netrc from your host if you have it.

or adjust vars_common.yaml
```yaml
ssh_keys:
- name: Stolyarov
  ssh_pub_file: "~/.ssh/github_rsa.pub"
  ssh_priv_file:  "~/.ssh/github_rsa"
```


cd /root
task devops:delete-terraform-cache:
task devops:aws.full_install

