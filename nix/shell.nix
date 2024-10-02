{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs           # Node.js for running the React app
    pkgs.git              # Git for version control
  ];

  shellHook = ''
    echo "Welcome to the React development environment!"
    echo "Node version: $(node -v)"
  '';
}