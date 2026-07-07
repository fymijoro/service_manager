const now = Date.now()
const daysAgo = (n) => new Date(now - n * 24 * 60 * 60 * 1000)
const hoursAgo = (n) => new Date(now - n * 60 * 60 * 1000)

export const initialServices = [
  { id: 'bind9', name: 'BIND9', unit: 'bind9', code: 'DNS', docsCmd: 'named', description: 'named (BIND9) is a Domain Name System (DNS) server', status: 'running', enabledPreset: 'disabled', startedAt: daysAgo(4) },
  { id: 'isc-dhcp-server', name: 'ISC-DHCP-SERVER', unit: 'isc-dhcp-server', code: 'DHCP', docsCmd: 'dhcpd', description: 'isc-dhcp-server is the ISC DHCP server daemon', status: 'running', enabledPreset: 'disabled', startedAt: daysAgo(4) },
  { id: 'nginx', name: 'NGINX', unit: 'nginx', code: 'NGX', docsCmd: 'nginx', description: 'nginx is a high performance web server and reverse proxy', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(12) },
  { id: 'vsftpd', name: 'VSFTPD', unit: 'vsftpd', code: 'FTP', docsCmd: 'vsftpd', description: 'vsftpd is a secure, fast FTP server for Unix-like systems', status: 'running', enabledPreset: 'disabled', startedAt: daysAgo(2) },
  { id: 'postfix', name: 'POSTFIX', unit: 'postfix', code: 'SMTP', docsCmd: 'postfix', description: 'postfix is the Postfix Mail Transport Agent', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(12) },
  { id: 'sshd', name: 'SSHD', unit: 'sshd', code: 'SSH', docsCmd: 'sshd', description: 'sshd (OpenSSH Daemon) is the daemon program for ssh', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(12) },
  { id: 'iptables', name: 'IPTABLES', unit: 'iptables', code: 'IPT', docsCmd: 'iptables', description: 'iptables is the userspace utility for the Linux kernel firewall', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(12) },
  { id: 'docker', name: 'DOCKER', unit: 'docker', code: 'DKR', docsCmd: 'dockerd', description: 'dockerd is the Docker Application Container Engine daemon', status: 'running', enabledPreset: 'enabled', startedAt: hoursAgo(6) },
  { id: 'mariadb', name: 'MARIADB', unit: 'mariadb', code: 'SQL', docsCmd: 'mariadbd', description: 'mariadb is the MariaDB relational database server', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(3) },
  { id: 'kubelet', name: 'KUBELET', unit: 'kubelet', code: 'K8S', docsCmd: 'kubelet', description: 'kubelet is the primary node agent for Kubernetes', status: 'stopped', enabledPreset: 'disabled', startedAt: daysAgo(20) },
  { id: 'snmpd', name: 'SNMPD', unit: 'snmpd', code: 'SNMP', docsCmd: 'snmpd', description: 'snmpd is the Simple Network Management Protocol daemon', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(12) },
  { id: 'cron', name: 'CRON', unit: 'cron', code: 'CRON', docsCmd: 'cron', description: 'cron is the background job scheduling daemon', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(12) },
  { id: 'suricata', name: 'SURICATA', unit: 'suricata', code: 'IDS', docsCmd: 'suricata', description: 'suricata is a network intrusion detection and prevention engine', status: 'stopped', enabledPreset: 'disabled', startedAt: daysAgo(30) },
  { id: 'bluetooth', name: 'BLUETOOTH', unit: 'bluetooth', code: 'BT', docsCmd: 'bluetoothd', description: 'bluetooth is the daemon that manages Bluetooth devices', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(12) },
  { id: 'networkmanager', name: 'NETWORKMANAGER', unit: 'NetworkManager', code: 'NET', docsCmd: 'NetworkManager', description: 'NetworkManager manages network connections and interfaces', status: 'running', enabledPreset: 'enabled', startedAt: daysAgo(12) },
  { id: 'slapd', name: 'SLAPD', unit: 'slapd', code: 'LDAP', docsCmd: 'slapd', description: 'slapd is the stand-alone OpenLDAP server daemon', status: 'stopped', enabledPreset: 'disabled', startedAt: daysAgo(45) },
]