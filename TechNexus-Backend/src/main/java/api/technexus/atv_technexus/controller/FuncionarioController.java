package api.technexus.atv_technexus.controller;

import api.technexus.atv_technexus.dto.FuncionarioRequestDTO;
import api.technexus.atv_technexus.dto.FuncionarioResponseDTO;
import api.technexus.atv_technexus.service.FuncionarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin("*")
public class FuncionarioController {

    @Autowired
    private FuncionarioService service;

    @PostMapping
    public ResponseEntity<Map<String, Object>> cadastrar(@Valid @RequestBody FuncionarioRequestDTO funcionarioDTO){
        service.cadastrar((funcionarioDTO));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Funcionário cadastrado com sucesso! ✅"));
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDTO>> listar(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizar(@PathVariable Long id,
                                                         @RequestBody FuncionarioRequestDTO funcionarioDTO){
        service.atualizar(id,funcionarioDTO);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("mensagem", "Funcionário atualizado com sucesso! ✅"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletar(@PathVariable Long id){
        service.deletar(id);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("mensagem", "Funcionário deletado com sucesso! 🗑️"));
    }
}
